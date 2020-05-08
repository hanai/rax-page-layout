import { createElement, useState } from 'rax';
import View from 'rax-view';
import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Row from '../../components/Row';
import styles from './styles';

const LIST_SIZE = 200;

export default function Home() {
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

  return (
    <PageLayout>
      <PageHeader>
        <Header />
      </PageHeader>
      <PageMain
        isRefreshing={isRefreshing}
        hasPullToRefresh={true}
        onPullToRefresh={refreshAsync}
      >
        <View style={styles.list}>
          {list.map((e, i) => (
            <Row key={i} text={e} />
          ))}
        </View>
      </PageMain>
      <PageFooter>
        <Footer />
      </PageFooter>
    </PageLayout>
  );
}
