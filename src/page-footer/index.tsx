import { createElement, RaxNode } from 'rax';
import View from 'rax-view';

import styles from './styles';

export interface PageFooterProps {
  children: RaxNode;
}

const PageFooter = (props) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default PageFooter;
