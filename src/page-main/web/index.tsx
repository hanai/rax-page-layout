import { createElement, RaxNode, useRef, useState, useEffect } from 'rax';
import View from 'rax-view';
import ScrollView, { ScrollViewProps } from 'rax-scrollview';
import findDOMNode from 'rax-find-dom-node';

// @ts-ignore
import animate from 'universal-animation';

import styles from './styles';
import PullToRefreshIndicator, {
  height as PullToRefreshIndicatorHeight,
  PullToRefreshIndicatorProps,
} from '../../components/pull-to-refresh-indicator';

import { PullToRefreshState } from '../../types';
import { getViewportHeight, toUnitValue, easeOutCubic } from '../../utils';

export interface PageMainProps extends ScrollViewProps {
  children: RaxNode;
  hasPullToRefresh?: boolean;
  renderPullToRefreshIndicator?: (
    props: PullToRefreshIndicatorProps
  ) => RaxNode;
  pullToRefreshIndicatorHeight?: number;
  onPullToRefresh?: () => any;
}

const renderPullToRefreshIndicator = (props: PullToRefreshIndicatorProps) => {
  return <PullToRefreshIndicator {...props} />;
};

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
  const scrollViewRef = useRef(null);
  const ptrFlagRef = useRef<boolean>(false);
  const ptrStartYRef = useRef<number>(0);
  const transformViewRef = useRef(null); // transformView was used for animation or transform

  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    getViewportHeight(setViewportHeight);
  }, []);

  const [transformY, setTransformY] = useState<number>(0);
  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.STATIC
  );

  const getScrollTop: () => number = () => {
    const node = findDOMNode(scrollViewRef.current);
    if (node) {
      return toUnitValue(node.scrollTop);
    } else {
      return 0;
    }
  };

  const handleScroll = (e) => {
    props.onScroll && props.onScroll(e);
  };

  const handleTouchStart = (e) => {
    const scrollTop = getScrollTop();
    if (hasPullToRefresh) {
      if (e && e.changedTouches && e.changedTouches.length) {
        if (scrollTop === 0) {
          const y = toUnitValue(e.changedTouches[0].screenY);

          ptrFlagRef.current = true;
          ptrStartYRef.current = y;
        } else {
          ptrFlagRef.current = false;
        }
      }
    }

    props.onTouchStart && props.onTouchStart(e);
  };

  const handleTouchMove = (e) => {
    const scrollTop = getScrollTop();
    if (hasPullToRefresh) {
      if (e && e.changedTouches && e.changedTouches.length) {
        const y = toUnitValue(e.changedTouches[0].screenY);

        if (!ptrFlagRef.current && scrollTop === 0) {
          ptrFlagRef.current = true;
          ptrStartYRef.current = y;
          // first emmit, pass follow logic
        } else if (ptrFlagRef.current) {
          const delta = easeOutCubic(
            y - ptrStartYRef.current,
            viewportHeight,
            viewportHeight / 4
          );

          if (delta > 0) {
            setTransformY(delta);
            if (delta > PullToRefreshIndicatorHeight) {
              setPtrState(PullToRefreshState.READY);
            } else {
              setPtrState(PullToRefreshState.PULLING);
            }
          } else {
            setTransformY(0);
            ptrFlagRef.current = false;
          }
        }
      }
    }

    props.onTouchMove && props.onTouchMove(e);
  };

  const handleTouchEnd = (e) => {
    if (hasPullToRefresh) {
      if (ptrFlagRef.current) {
        ptrFlagRef.current = false;

        if (ptrState === PullToRefreshState.PULLING) {
          transformYView(transformViewRef, transformY, 0, () => {
            setPtrState(PullToRefreshState.STATIC);
          });
        } else if (ptrState === PullToRefreshState.READY) {
          transformYView(
            transformViewRef,
            transformY,
            pullToRefreshIndicatorHeight,
            () => {
              setPtrState(PullToRefreshState.REFRESHING);
            }
          );

          handlePullToRefresh();
        }
      }
    }

    props.onTouchEnd && props.onTouchEnd(e);
  };

  const handleTouchCancel = (e) => {
    props.onTouchCancel && props.onTouchCancel(e);
  };

  const afterPtr = () => {
    setPtrState(PullToRefreshState.RETRACTING);
    transformYView(transformViewRef, pullToRefreshIndicatorHeight, 0, () => {
      // it's ok without reset state: transformY
      setPtrState(PullToRefreshState.STATIC);
    });
  };

  const handlePullToRefresh = () => {
    if (props.onPullToRefresh) {
      const ret = props.onPullToRefresh();
      if (ret && ret.finally) {
        ret.finally(afterPtr);
      } else {
        afterPtr();
      }
    } else {
      afterPtr();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View
          ref={transformViewRef}
          style={{ transform: `translateY(${transformY}rpx)` }}
        >
          {hasPullToRefresh
            ? props.renderPullToRefreshIndicator({
                state: ptrState,
              })
            : null}
          <View>{children}</View>
        </View>
      </ScrollView>
    </View>
  );
};

PageMain.defaultProps = {
  renderPullToRefreshIndicator,
  pullToRefreshIndicatorHeight: PullToRefreshIndicatorHeight,
  hasPullToRefresh: false,
};

export default PageMain;
