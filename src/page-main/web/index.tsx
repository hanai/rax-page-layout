import {
  createElement,
  UIEventHandler,
  CSSProperties,
  TouchEventHandler,
} from 'rax';

import { PullToRefreshIndicatorProps } from 'rax-pull-to-refresh-indicator';

import PageMainNative from './native';
import PageMainBetterScroll from './better-scroll';

import {
  PageMainProps as CommonPageMainProps,
  defaultProps as commonDefaultProps,
} from '../common';

export interface PageMainProps extends CommonPageMainProps {
  betterScroll?: boolean;
  pullToRefreshIndicatorProps?: Partial<PullToRefreshIndicatorProps>;

  containerStyle?: CSSProperties;
  contentContainerStyle?: CSSProperties;

  onScroll?: UIEventHandler<HTMLDivElement>;
  onTouchStart?: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
  onTouchCancel?: TouchEventHandler<HTMLDivElement>;
}

const PageMainWrapper = (props: PageMainProps) => {
  const { betterScroll, ...otherProps } = props;

  if (betterScroll) {
    return <PageMainBetterScroll {...otherProps} />;
  } else {
    return <PageMainNative {...otherProps} />;
  }
};

PageMainWrapper.defaultProps = Object.assign(
  {
    betterScroll: true,
  },
  commonDefaultProps
);

export default PageMainWrapper;
