import { createElement, render, useState } from 'rax';
import DriverUniversal from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';

import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
import styles from './styles';

const LIST_SIZE = 200;

const App = () => {
  const [list, setList] = useState(() =>
    Array(LIST_SIZE)
      .fill()
      .map((_, i) => i)
  );

  const refresh = () => {
    setList((list) =>
      list.map(
        (val) => val + parseInt(Math.random() * LIST_SIZE, 10) - LIST_SIZE / 2
      )
    );
  };

  const refreshAsync = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        refresh();
        resolve();
      }, 5000);
    });
  };

  return (
    <PageLayout>
      <PageHeader>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
      </PageHeader>
      <PageMain hasPullToRefresh={true} onPullToRefresh={refreshAsync}>
        <View style={styles.listContainer}>
          {list.map((val, i) => (
            <View key={i} style={styles.rowItem}>
              <Text>{val}</Text>
            </View>
          ))}
        </View>
      </PageMain>
      <PageFooter>
        <View style={styles.header}>
          <Text>Footer</Text>
        </View>
      </PageFooter>
    </PageLayout>
  );
};

render(<App />, document.body, { driver: DriverUniversal });
