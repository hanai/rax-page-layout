import { createElement, RaxNode, CSSProperties } from 'rax';
import View from 'rax-view';

import styles from './styles';

export interface PageFooterProps {
  children: RaxNode;
  containerStyle?: CSSProperties;
}

const PageFooter = (props) => {
  const { children, containerStyle } = props;

  return (
    <View style={Object.assign({}, styles.container, containerStyle)}>
      {children}
    </View>
  );
};

export default PageFooter;
