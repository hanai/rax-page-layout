import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export default Header;
