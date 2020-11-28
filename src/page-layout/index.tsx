import { createElement, RaxNode, useEffect, useRef } from 'rax';
import View from 'rax-view';
import setNativeProps from 'rax-set-native-props';
import { isWeb } from 'universal-env';

import styles from './styles';
import { getViewportHeight, useEventCallback } from '../utils';

export interface PageLayoutProps {
  children: RaxNode;
  bodyOverflow?: CSSStyleDeclaration['overflow'];
}

const PageLayout = (props: PageLayoutProps) => {
  const { children, bodyOverflow } = props;

  const pageLayoutContainerRef = useRef<HTMLDivElement>(null);

  const handleRecalcViewportHeight = useEventCallback(() => {
    getViewportHeight((height) => {
      setNativeProps(pageLayoutContainerRef.current, {
        style: {
          height: `${height}rpx`,
        },
      });
    });
  }, [pageLayoutContainerRef]);

  useEffect(() => {
    if (isWeb) {
      handleRecalcViewportHeight();

      window.addEventListener('resize', handleRecalcViewportHeight);
      window.addEventListener('orientationchange', handleRecalcViewportHeight);
    }

    return () => {
      if (isWeb) {
        window.removeEventListener('resize', handleRecalcViewportHeight);
        window.addEventListener(
          'orientationchange',
          handleRecalcViewportHeight
        );
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = bodyOverflow; // fix page over scroll in webview
  }, [bodyOverflow]);

  return (
    <View ref={pageLayoutContainerRef} style={styles.container}>
      {children}
    </View>
  );
};

PageLayout.defaultProps = {
  bodyOverflow: 'hidden',
};

export default PageLayout;
