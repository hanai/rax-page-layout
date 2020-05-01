import { createElement, RaxNode, useEffect, useState } from 'rax';
import View from 'rax-view';

import styles from './styles';
import { getViewportHeight } from '../utils';

export interface PageLayoutProps {
  children: RaxNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    getViewportHeight(setViewportHeight);
  }, []);

  return (
    <View style={Object.assign(styles.container, { height: viewportHeight })}>
      {children}
    </View>
  );
};

export default PageLayout;
