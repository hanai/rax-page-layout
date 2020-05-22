import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from 'rax-textinput';

import styles from './styles';

const Footer = (props) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="TextInput" style={styles.footerInput} />
    </View>
  );
};

export default Footer;
