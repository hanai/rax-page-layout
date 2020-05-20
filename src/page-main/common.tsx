import { createElement } from 'rax';
import PullToRefreshIndicator, {
  PullToRefreshIndicatorProps,
} from 'rax-pull-to-refresh-indicator';

export interface PageMainProps {
  children: any;
  isRefreshing?: boolean;
  hasPullToRefresh?: boolean;
  onPullToRefresh?: () => any;
  onEndReachedThreshold?: number;
  onEndReached?: () => any;
  renderPullToRefreshIndicator?: (props: PullToRefreshIndicatorProps) => any;
}

export const defaultProps = {
  onEndReachedThreshold: 1000,
  hasPullToRefresh: false,
  isRefreshing: false,
  renderPullToRefreshIndicator(props: PullToRefreshIndicatorProps) {
    return <PullToRefreshIndicator {...props} />;
  },
};
