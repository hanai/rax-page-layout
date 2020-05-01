import { createElement, RaxNode } from 'rax';
import View from 'rax-view';

import styles from './styles';

export interface PageHeaderProps {
  children: RaxNode;
}

const PageHeader = (props: PageHeaderProps) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default PageHeader;
