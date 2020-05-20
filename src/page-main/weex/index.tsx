import { createElement, RaxNode, useRef, useState } from 'rax';
import View from 'rax-view';
import ScrollView, { ScrollViewProps } from 'rax-scrollview';
import { PullToRefreshState } from 'rax-pull-to-refresh-indicator';

import styles from './styles';

import RefreshControl from 'rax-refreshcontrol';
// @ts-ignore
import { WeexPullingdownEvent } from 'rax-refreshcontrol/lib/types';

import {
  PageMainProps as CommonPageMainProps,
  defaultProps as commonDefaultProps,
} from '../common';

export interface PageMainProps extends CommonPageMainProps {}

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, isRefreshing } = props;

  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.PULLING
  );

  const afterPtr = () => {
    setPtrState(PullToRefreshState.PULLING);
  };

  const onRefreshControlRefresh = () => {
    if (!props.isRefreshing && props.onPullToRefresh) {
      setPtrState(PullToRefreshState.REFRESHING);
      const ret = props.onPullToRefresh();
      if (ret && ret.then) {
        ret.then(afterPtr).catch(afterPtr);
      } else {
        afterPtr();
      }
    }
  };

  const onRefreshControlPullingdown = (e: WeexPullingdownEvent) => {
    const { pullingDistance, viewHeight } = e;
    if (pullingDistance < viewHeight) {
      setPtrState(PullToRefreshState.PULLING);
    } else {
      setPtrState(PullToRefreshState.READY);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {hasPullToRefresh ? (
          <RefreshControl
            onRefresh={onRefreshControlRefresh}
            // @ts-ignore
            onPullingdown={onRefreshControlPullingdown}
            refreshing={isRefreshing}
          >
            {props.renderPullToRefreshIndicator({ state: ptrState })}
          </RefreshControl>
        ) : null}
        {children}
      </ScrollView>
    </View>
  );
};

PageMain.defaultProps = Object.assign(commonDefaultProps, {});

export default PageMain;
