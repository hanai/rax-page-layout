import { createElement, RaxNode, useEffect, useRef } from 'rax';
import View from 'rax-view';
import setNativeProps from 'rax-set-native-props';

import styles from './styles';
import { getViewportHeight } from '../utils';

export interface PageLayoutProps {
  children: RaxNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  const pageLayoutContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getViewportHeight((height) => {
      setNativeProps(pageLayoutContainerRef.current, {
        style: {
          height: `${height}rpx`,
        },
      });
    });
  }, []);

  return (
    <View ref={pageLayoutContainerRef} style={styles.container}>
      {children}
    </View>
  );
};

export default PageLayout;
