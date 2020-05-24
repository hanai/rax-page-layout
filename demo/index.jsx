import { createElement, render, useState } from 'rax';
import DriverUniversal from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from 'rax-textinput';

import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
import styles from './styles';

const LIST_SIZE = 200;

const App = () => {
  const [list, setList] = useState(() =>
    Array(LIST_SIZE)
      .fill()
      .map((_, i) => i)
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setList((list) =>
      list.map(
        (val) => val + parseInt(Math.random() * LIST_SIZE, 10) - LIST_SIZE / 2
      )
    );
  };

  const refreshAsync = () => {
    setIsRefreshing(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        refresh();
        setIsRefreshing(false);
        resolve();
      }, 5000);
    });
  };

  const Row = ({ text }) => {
    const [bgColor, setBgColor] = useState('#fff');
    const handleClick = () => {
      setBgColor('#00f');
      setTimeout(() => {
        setBgColor('#fff');
      }, 2000);
    };
    return (
      <View
        onClick={handleClick}
        style={{ ...styles.rowItem, backgroundColor: bgColor }}
      >
        <Text>{text}</Text>
      </View>
    );
  };

  return (
    <PageLayout>
      <PageHeader>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
      </PageHeader>
      <PageMain
        isRefreshing={isRefreshing}
        hasPullToRefresh={true}
        onPullToRefresh={refreshAsync}
      >
        <View style={styles.listContainer}>
          {list.map((val, i) => (
            <Row key={i} text={val} />
          ))}
        </View>
      </PageMain>
      <PageFooter>
        <View style={styles.footer}>
          <TextInput placeholder="TextInput" style={styles.footerInput} />
        </View>
      </PageFooter>
    </PageLayout>
  );
};

render(<App />, document.body, { driver: DriverUniversal });
