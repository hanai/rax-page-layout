import { createElement, RaxNode, useRef, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView, { ScrollViewProps } from 'rax-scrollview';
import findDOMNode from 'rax-find-dom-node';

import styles from './styles';
import PullToRefreshIndicator, {
  height as PullToRefreshIndicatorHeight,
  PullToRefreshIndicatorProps,
  PullToRefreshState,
} from 'rax-pull-to-refresh-indicator';

import { toUnitValue } from '../../utils/unit';

export interface PageMainProps extends ScrollViewProps {
  children: RaxNode;
  hasPullToRefresh?: boolean;
  renderPullToRefreshIndicator?: (
    props: PullToRefreshIndicatorProps
  ) => RaxNode;
  pullToRefreshIndicatorHeight?: number;
}

const renderPullToRefreshIndicator = (props: PullToRefreshIndicatorProps) => {
  return <PullToRefreshIndicator {...props} />;
};

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, pullToRefreshIndicatorHeight } = props;
  const scrollViewRef = useRef(null);
  const scrollTopRef = useRef<number>(0);
  const ptrFlagRef = useRef<boolean>(false);
  const ptrStartYRef = useRef<number>(0);

  const [transformY, setTransformY] = useState<number>(0);
  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.PULLING
  );

  const handleScroll = (e) => {
    if (hasPullToRefresh) {
      if (e && e.nativeEvent && e.nativeEvent.contentOffset) {
        const scrollTop = e.nativeEvent.contentOffset.y;
        scrollTopRef.current = scrollTop;
      }
    }

    props.onScroll && props.onScroll(e);
  };

  const handleTouchStart = (e) => {
    if (hasPullToRefresh) {
      if (e && e.changedTouches && e.changedTouches.length) {
        if (scrollTopRef.current === 0) {
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
    if (hasPullToRefresh) {
      if (e && e.changedTouches && e.changedTouches.length) {
        const y = toUnitValue(e.changedTouches[0].screenY);

        if (!ptrFlagRef.current && scrollTopRef.current === 0) {
          ptrFlagRef.current = true;
          ptrStartYRef.current = y;
          // first emmit, pass follow logic
        } else if (ptrFlagRef.current) {
          const delta = y - ptrStartYRef.current;

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

          if (ptrFlagRef.current && scrollTopRef.current > 0) {
            // under android's weex, touchmove up will cause ScrollView scroll (ios not tested)
            scrollViewRef.current.scrollTo(0, 0, false);
            scrollTopRef.current = 0;
          }
        }
      }
    }

    props.onTouchMove && props.onTouchMove(e);
  };

  const handleTouchEnd = (e) => {
    if (hasPullToRefresh) {
      ptrFlagRef.current = false;
    }

    props.onTouchEnd && props.onTouchEnd(e);
  };

  const handleTouchCancel = (e) => {
    props.onTouchCancel && props.onTouchCancel(e);
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
        <View>
          {hasPullToRefresh
            ? props.renderPullToRefreshIndicator({
                style: {
                  position: 'absolute',
                  transform: `translateY(${
                    transformY - pullToRefreshIndicatorHeight
                  }rpx)`,
                },
                state: ptrState,
              })
            : null}
          <View
            style={{
              transform: `translateY(${transformY}rpx)`,
            }}
          >
            {children}
          </View>
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
