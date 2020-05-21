import {
  createElement,
  RaxNode,
  useRef,
  useState,
  useEffect,
  UIEventHandler,
  TouchEventHandler,
  CSSProperties,
} from 'rax';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';

// @ts-ignore
import animate from 'universal-animation';

import styles from './styles';
import {
  height as PullToRefreshIndicatorHeight,
  PullToRefreshIndicatorProps,
  PullToRefreshState,
} from 'rax-pull-to-refresh-indicator';

import {
  PageMainProps as CommonPageMainProps,
  defaultProps as commonDefaultProps,
} from '../common';

import { toUnitValue, useEventCallback } from '../../utils';

export interface PageMainProps extends CommonPageMainProps {
  pullToRefreshIndicatorHeight?: number;
  pullToRefreshIndicatorProps?: Partial<PullToRefreshIndicatorProps>;

  containerStyle?: CSSProperties;
  contentStyle?: CSSProperties;

  onScroll?: UIEventHandler<HTMLDivElement>;
  onTouchStart?: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
  onTouchCancel?: TouchEventHandler<HTMLDivElement>;
}

const transformYView = (ref, start: number, end: number, cb?: () => any) => {
  animate(
    {
      props: [
        {
          element: findDOMNode(ref.current),
          property: 'transform.translateY',
          easing: 'easeOutSine',
          duration: 100,
          start: start,
          end: end,
        },
      ],
    },
    () => {
      cb && cb();
    }
  );
};

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, pullToRefreshIndicatorHeight } = props;

  const scrollViewRef = useRef<HTMLDivElement>(null);
  const transformViewRef = useRef<HTMLDivElement>(null); // transformView was used for animation or transform

  const prevIsRefreshing = useRef<boolean>(props.isRefreshing);
  const ptrFlagRef = useRef<boolean>(false);
  const ptrStartYRef = useRef<number>(0);
  const scrollTopRef = useRef<number>(0); // keep scrollTop for use

  const [transformY, setTransformY] = useState<number>(0);
  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.PULLING
  );

  useEffect(() => {
    window.requestAnimationFrame(enablePTRIfNeeded);
  }, []);

  useEffect(() => {
    if (prevIsRefreshing.current && !props.isRefreshing) {
      disablePTR();
      window.requestAnimationFrame(enablePTRIfNeeded);
    }
    prevIsRefreshing.current = props.isRefreshing;
  }, [props.isRefreshing]);

  const getScrollTop: () => number = () => {
    const node = findDOMNode(scrollViewRef.current);
    if (node) {
      return toUnitValue(node.scrollTop);
    } else {
      return 0;
    }
  };

  const handleScroll = (e) => {
    requestAnimationFrame(() => {
      const scrollTop = getScrollTop();
      scrollTopRef.current = scrollTop;

      if (hasPullToRefresh) {
        scrollTop <= 0 ? enablePTR() : disablePTR();
      }
    });

    props.onScroll && props.onScroll(e);
  };

  const handleTouchStart = (e) => {
    props.onTouchStart && props.onTouchStart(e);
  };

  const handleTouchMove = (e) => {
    props.onTouchMove && props.onTouchMove(e);
  };

  const handleTouchEnd = (e) => {
    props.onTouchEnd && props.onTouchEnd(e);
  };

  const handleTouchCancel = (e) => {
    props.onTouchCancel && props.onTouchCancel(e);
  };

  const handlePtrTouchStart = useEventCallback((e) => {
    const y = toUnitValue(e.touches[0].screenY);
    ptrStartYRef.current = y;
  }, []);

  const handlePtrTouchMove = useEventCallback((e) => {
    const y = toUnitValue(e.touches[0].screenY);

    const delta = Math.round(0.4 * (y - ptrStartYRef.current));

    if (delta <= 0 && transformY === 0) {
    } else {
      if (delta > 0 && e.cancelable !== false) {
        e.preventDefault();
      }

      setTransformY(delta);

      if (delta > pullToRefreshIndicatorHeight) {
        setPtrState(PullToRefreshState.READY);
      } else {
        setPtrState(PullToRefreshState.PULLING);
      }
    }
  }, []);

  const handlePtrTouchEnd = useEventCallback((e) => {
    if (ptrState === PullToRefreshState.PULLING) {
      transformYView(transformViewRef, transformY, 0, () => {
        setTransformY(0);
      });
    } else if (ptrState === PullToRefreshState.READY) {
      transformYView(
        transformViewRef,
        transformY,
        pullToRefreshIndicatorHeight,
        () => {
          setPtrState(PullToRefreshState.REFRESHING);
          setTransformY(pullToRefreshIndicatorHeight);
        }
      );

      disablePTR();

      handlePullToRefresh();
    }
  }, []);

  const enablePTRIfNeeded = () => {
    if (hasPullToRefresh && getScrollTop() <= 0) {
      enablePTR();
    }
  };

  const enablePTR = () => {
    if (!ptrFlagRef.current) {
      ptrFlagRef.current = true;
      const scrollView = scrollViewRef.current;

      scrollView.addEventListener('touchstart', handlePtrTouchStart);
      scrollView.addEventListener('touchmove', handlePtrTouchMove);
      scrollView.addEventListener('touchend', handlePtrTouchEnd);
    }
  };

  const disablePTR = () => {
    if (ptrFlagRef.current) {
      ptrFlagRef.current = false;
      const scrollView = scrollViewRef.current;
      scrollView.removeEventListener('touchstart', handlePtrTouchStart);
      scrollView.removeEventListener('touchmove', handlePtrTouchMove);
      scrollView.removeEventListener('touchend', handlePtrTouchEnd);
    }
  };

  const afterPtr = () => {
    setPtrState(PullToRefreshState.PULLING);
    transformYView(transformViewRef, pullToRefreshIndicatorHeight, 0, () => {
      setTransformY(0);
    });
  };

  const handlePullToRefresh = () => {
    if (!props.isRefreshing && props.onPullToRefresh) {
      const ret = props.onPullToRefresh();
      if (ret && ret.finally) {
        ret.finally(afterPtr);
      } else {
        afterPtr();
      }
    }
  };

  const containerStyle = Object.assign(
    styles.container,
    hasPullToRefresh
      ? {
          overscrollBehavior: 'none', // to disable chrome browser default behavior
        }
      : null,
    props.containerStyle
  );

  const transformViewStyle = Object.assign(styles.transformView, {
    transform: `translate3d(0, ${transformY}rpx, 0)`,
  });

  const contentStyle = Object.assign(
    {},
    transformY > 0
      ? {
          transform: 'translate3d(0, 0, 0)',
        }
      : null,
    props.contentStyle
  );

  const pullToRefreshIndicatorProps = hasPullToRefresh
    ? Object.assign(
        {
          state: ptrState,
          hasIcon: true,
          hasText: true,
          style: {
            position: 'absolute',
            transform: 'translateY(-100%)',
          },
        },
        props.pullToRefreshIndicatorProps
      )
    : null;

  return (
    <View
      style={containerStyle}
      ref={scrollViewRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <View ref={transformViewRef} style={transformViewStyle}>
        {hasPullToRefresh
          ? props.renderPullToRefreshIndicator(pullToRefreshIndicatorProps)
          : null}
        <View style={contentStyle}>{children}</View>
      </View>
    </View>
  );
};

PageMain.defaultProps = Object.assign(commonDefaultProps, {
  pullToRefreshIndicatorHeight: PullToRefreshIndicatorHeight,
});

export default PageMain;
