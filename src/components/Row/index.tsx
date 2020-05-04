import { createElement } from 'rax';

import styles from './styles';
import View from 'rax-view';
import Text from 'rax-text';

const Row = (props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Row;
