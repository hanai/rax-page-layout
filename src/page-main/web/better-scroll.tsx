import {
  createElement,
  useRef,
  useState,
  useEffect,
  CSSProperties,
  useCallback,
} from 'rax';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';

import BScroll from '@better-scroll/core';
import BSObserveDOM from '@better-scroll/observe-dom';
import BSPullDown from '@better-scroll/pull-down';
BScroll.use(BSObserveDOM);
BScroll.use(BSPullDown);

import { PullToRefreshState } from 'rax-pull-to-refresh-indicator';

import { betterScrollStyle as styles } from './styles';

import { toUnitValue, useEventCallback } from '../../utils';
import { PageMainProps } from './index';

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh } = props;

  const bsRef = useRef<BScroll>();

  const scrollViewRef = useRef<HTMLDivElement>(null);
  const transformViewRef = useRef<HTMLDivElement>(null); // transformView was used for animation or transform
  const pullToRefreshIndicatorContainerRef = useRef<HTMLDivElement>(null);

  const prevIsRefreshing = useRef<boolean>(props.isRefreshing);
  const pullingDownFlag = useRef<boolean>(false);
  const ptrStartYRef = useRef<number>(0);
  const scrollTopRef = useRef<number>(0); // keep scrollTop for use

  const [transformY, setTransformY] = useState<number>(0);
  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.PULLING
  );

  const getPTRIndicatorHeight = useCallback(
    (isPx = false) => {
      const height = pullToRefreshIndicatorContainerRef.current
        ? pullToRefreshIndicatorContainerRef.current.clientHeight
        : 0;
      return isPx ? height : toUnitValue(height);
    },
    [pullToRefreshIndicatorContainerRef]
  );

  useEffect(() => {
    if (scrollViewRef.current) {
      bsRef.current = new BScroll(scrollViewRef.current, {
        observeDOM: true,
        scrollY: true,
        probeType: 3,
        eventPassthrough: 'horizontal',
        pullDownRefresh: true,
      });

      bsRef.current.on('pullingDown', handlePullToRefresh);

      bsRef.current.on('scroll', handleScroll);
    }

    return () => {
      bsRef.current && bsRef.current.destroy();
    };
  }, [scrollViewRef]);

  useEffect(() => {
    if (props.hasPullToRefresh) {
      enablePTR();
    } else {
      disablePTR();
    }
  }, [props.hasPullToRefresh]);

  const getScrollTop = useCallback(() => {
    const node = findDOMNode(scrollViewRef.current);
    if (node) {
      return toUnitValue(node.scrollTop);
    } else {
      return 0;
    }
  }, [scrollViewRef]);

  const handleScroll = (e) => {
    scrollTopRef.current = e.y * -1;

    if (props.hasPullToRefresh) {
      const ptrIndicatorHeight = getPTRIndicatorHeight(true);
      if (!pullingDownFlag.current) {
        if (e.y > ptrIndicatorHeight) {
          setPtrState(PullToRefreshState.READY);
        } else {
          setPtrState(PullToRefreshState.PULLING);
        }
      }
    }

    props.onScroll && props.onScroll(e);
  };

  const enablePTR = () => {
    if (bsRef.current) {
      const ptrIndicatorHeight = getPTRIndicatorHeight(true);
      bsRef.current.openPullDown({
        threshold: ptrIndicatorHeight,
        stop: ptrIndicatorHeight,
      });
    }
  };

  const disablePTR = () => {
    if (bsRef.current) {
      bsRef.current.closePullDown();
    }
  };

  const afterPtr = () => {
    setPtrState(PullToRefreshState.PULLING);
    pullingDownFlag.current = false;
    bsRef.current.finishPullDown();
  };

  const handlePullToRefresh = () => {
    if (!props.isRefreshing && props.onPullToRefresh) {
      pullingDownFlag.current = true;
      setPtrState(PullToRefreshState.REFRESHING);
      const ret = props.onPullToRefresh();
      if (ret && ret.finally) {
        ret.finally(afterPtr);
      } else {
        afterPtr();
      }
    }
  };

  const containerStyle = Object.assign(styles.container, props.containerStyle);

  const transformViewStyle = Object.assign(
    {},
    {
      transform: `translate3d(0, ${transformY}rpx, 0)`,
    }
  );

  const contentContainerStyle = Object.assign({}, props.contentContainerStyle);

  const pullToRefreshIndicatorProps = hasPullToRefresh
    ? Object.assign(
        {
          state: ptrState,
          hasIcon: true,
          hasText: true,
        },
        props.pullToRefreshIndicatorProps
      )
    : null;

  const pullToRefreshIndicatorContainerStyle = {
    position: 'absolute',
    transform: 'translateY(-100%)',
  } as CSSProperties;

  return (
    <View
      style={containerStyle}
      ref={scrollViewRef}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      // onTouchCancel={handleTouchCancel}
    >
      <View>
        <View ref={transformViewRef} style={transformViewStyle}>
          {hasPullToRefresh ? (
            <View
              ref={pullToRefreshIndicatorContainerRef}
              style={pullToRefreshIndicatorContainerStyle}
            >
              {props.renderPullToRefreshIndicator(pullToRefreshIndicatorProps)}
            </View>
          ) : null}
          <View style={contentContainerStyle}>{children}</View>
        </View>
      </View>
    </View>
  );
};

export default PageMain;
