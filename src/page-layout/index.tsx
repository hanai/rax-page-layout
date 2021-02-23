import { createElement, RaxNode, useEffect, useRef, CSSProperties } from 'rax';
import View from 'rax-view';
import setNativeProps from 'rax-set-native-props';
import { isWeb } from 'universal-env';

import styles from './styles';
import { getViewportHeight, useEventCallback } from '../utils';

export interface PageLayoutProps {
  children: RaxNode;
  containerStyle?: CSSProperties;
  bodyOverflow?: CSSStyleDeclaration['overflow'];
}

const PageLayout = (props: PageLayoutProps) => {
  const { children, bodyOverflow, containerStyle } = props;

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
    // handle viewport resize or device rotate
    if (isWeb) {
      handleRecalcViewportHeight(); // init PageLayout height

      window.addEventListener('resize', handleRecalcViewportHeight);
      window.addEventListener('orientationchange', handleRecalcViewportHeight);

      return () => {
        window.removeEventListener('resize', handleRecalcViewportHeight);
        window.removeEventListener(
          'orientationchange',
          handleRecalcViewportHeight
        );
      };
    } else {
      return undefined;
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = bodyOverflow; // fix page over scroll in webview
  }, [bodyOverflow]);

  return (
    <View
      ref={pageLayoutContainerRef}
      style={Object.assign({}, styles.container, containerStyle)}
    >
      {children}
    </View>
  );
};

PageLayout.defaultProps = {
  bodyOverflow: 'hidden',
};

export default PageLayout;
