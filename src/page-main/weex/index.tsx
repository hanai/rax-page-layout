import { createElement, RaxNode, useRef, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView, { ScrollViewProps } from 'rax-scrollview';
import findDOMNode from 'rax-find-dom-node';
import PullToRefreshIndicator, {
  PullToRefreshState,
} from 'rax-pull-to-refresh-indicator';

import styles from './styles';

import { toUnitValue } from '../../utils/unit';

import RefreshControl from 'rax-refreshcontrol';
import { WeexPullingdownEvent } from 'rax-refreshcontrol/lib/types';

export interface PageMainProps extends ScrollViewProps {
  children: RaxNode;
  isRefreshing?: boolean;
  hasPullToRefresh?: boolean;
  onPullToRefresh?: () => any;
}

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, isRefreshing } = props;

  const [ptrState, setPtrState] = useState<PullToRefreshState>(
    PullToRefreshState.STATIC
  );

  const onRefreshControlRefresh = () => {};

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
            onPullingdown={onRefreshControlPullingdown}
            refreshing={true}
          >
            <PullToRefreshIndicator state={ptrState} />
          </RefreshControl>
        ) : null}
        {children}
      </ScrollView>
    </View>
  );
};

PageMain.defaultProps = {
  hasPullToRefresh: false,
};

export default PageMain;
