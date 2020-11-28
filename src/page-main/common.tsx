import { createElement } from 'rax';
import PullToRefreshIndicator, {
  PullToRefreshIndicatorProps,
} from 'rax-pull-to-refresh-indicator';

import BScroll from '@better-scroll/core';

export interface PageMainProps {
  children: any;
  isRefreshing?: boolean;
  hasPullToRefresh?: boolean;
  onPullToRefresh?: () => any;
  onEndReachedThreshold?: number;
  onEndReached?: () => any;
  renderPullToRefreshIndicator?: (props: PullToRefreshIndicatorProps) => any;
  scrollerRef?: Rax.MutableRefObject<{
    bsRef?: Rax.MutableRefObject<BScroll>;
    scrollToElement: (el: HTMLElement, time: number) => void;
  }>;
}

export const defaultProps = {
  onEndReachedThreshold: 1000,
  hasPullToRefresh: false,
  isRefreshing: false,
  renderPullToRefreshIndicator(props: PullToRefreshIndicatorProps) {
    return <PullToRefreshIndicator {...props} />;
  },
};
