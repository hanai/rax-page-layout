import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import styles from './styles';

const Footer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Footer</Text>
    </View>
  );
};

export default Footer;
