import {
  createElement,
  useRef,
  useState,
  useEffect,
  CSSProperties,
  useCallback,
  useImperativeHandle,
} from 'rax';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';
import uniqBy from 'lodash/uniqBy';
import BScroll from '@better-scroll/core';
import BSObserveDOM from '@better-scroll/observe-dom';
import BSPullDown from '@better-scroll/pull-down';

import { PullToRefreshState } from 'rax-pull-to-refresh-indicator';

import { betterScrollStyle as styles } from './styles';

import { toUnitValue, usePrevious } from '../../utils';
import { PageMainProps } from './index';

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, bsProps } = props;

  const bsRef = useRef<BScroll>();

  const transformViewRef = useRef<HTMLDivElement>(null); // transformView was used for animation or transform
  const pullToRefreshIndicatorContainerRef = useRef<HTMLDivElement>(null);

  const pullingDownFlag = useRef<boolean>(false);
  const scrollTopRef = useRef<number>(0); // keep scrollTop for use

  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.PULLING
  );

  const prevIsRefreshing = usePrevious(props.isRefreshing);

  useImperativeHandle(props.scrollerRef, () => {
    return {
      bsRef: bsRef,
      scrollToElement(el, time) {
        if (bsRef.current) {
          return bsRef.current.scrollToElement(el, time, true, true);
        }
      },
      refresh() {
        if (bsRef.current) {
          return bsRef.current.refresh();
        }
      },
    };
  });

  const getPTRIndicatorHeight = useCallback(
    (isPx = false) => {
      const height = pullToRefreshIndicatorContainerRef.current
        ? pullToRefreshIndicatorContainerRef.current.clientHeight
        : 0;
      return isPx ? height : toUnitValue(height);
    },
    [pullToRefreshIndicatorContainerRef]
  );

  const scrollViewRefCB = useCallback((node?: HTMLDivElement) => {
    if (node != null) {
      const internalBsPlugins = [BSObserveDOM, BSPullDown];
      const plugins = uniqBy(
        [...props.bsPlugins, ...internalBsPlugins],
        'pluginName'
      );

      plugins.forEach(BScroll.use);

      bsRef.current = new BScroll(node, {
        bserveDOM: true,
        scrollY: true,
        probeType: 3,
        click: true,
        eventPassthrough: 'horizontal',
        pullDownRefresh: true,
        ...bsProps,
      });

      if (props.scrollerRef?.current?.bsRef != null) {
        props.scrollerRef.current.bsRef.current = bsRef.current;
      }

      setTimeout(() => {
        bsRef.current.refresh();
      }, 200);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (bsRef.current) {
        bsRef.current.destroy();
        bsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const needRefresh = prevIsRefreshing && !props.isRefreshing;

    if (needRefresh) {
      bsRef.current.refresh();
    }
  }, [prevIsRefreshing, props.isRefreshing]);

  useEffect(() => {
    if (bsRef.current) {
      bsRef.current.on('pullingDown', handlePullToRefresh);
    }

    return () => {
      bsRef.current.off('pullingDown', handlePullToRefresh);
    };
  }, [props.onPullToRefresh]);

  useEffect(() => {
    if (bsRef.current) {
      bsRef.current.on('scroll', handleScroll);
    }
    return () => {
      if (bsRef.current) {
        bsRef.current.off('scroll', handleScroll);
      }
    };
  }, [props.onScroll]);

  useEffect(() => {
    if (props.hasPullToRefresh) {
      enablePTR();
    } else {
      disablePTR();
    }
  }, [props.hasPullToRefresh]);

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
      transform: `translate3d(0, 0, 0)`,
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
      ref={scrollViewRefCB}
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
