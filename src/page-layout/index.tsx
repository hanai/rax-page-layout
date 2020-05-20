import { createElement, RaxNode, useEffect, useRef } from 'rax';
import View from 'rax-view';
import setNativeProps from 'rax-set-native-props';
import { isWeb } from 'universal-env';

import styles from './styles';
import { getViewportHeight, useEventCallback } from '../utils';

export interface PageLayoutProps {
  children: RaxNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  const pageLayoutContainerRef = useRef<HTMLDivElement>(null);

  const handleRecalcViewportHeight = useEventCallback(() => {
    getViewportHeight((height) => {
      setNativeProps(pageLayoutContainerRef.current, {
        style: {
          height: `${height}rpx`,
        },
      });
    });
  }, []);

  useEffect(() => {
    getViewportHeight((height) => {
      setNativeProps(pageLayoutContainerRef.current, {
        style: {
          height: `${height}rpx`,
        },
      });
    });

    if (isWeb) {
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

  return (
    <View ref={pageLayoutContainerRef} style={styles.container}>
      {children}
    </View>
  );
};

export default PageLayout;
