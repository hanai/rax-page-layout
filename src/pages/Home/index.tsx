import { createElement, useState } from 'rax';

import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Row from '../../components/Row';

export default function Home() {
  const [list, setList] = useState(new Array(100).fill(0).map((_, i) => i));

  const refresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setList(
          new Array(100).fill(0).map((_) => Math.floor(Math.random() * 10))
        );
      }, 5000);
      resolve();
    });
  };

  return (
    <PageLayout>
      <PageHeader>
        <Header />
      </PageHeader>
      <PageMain hasPullToRefresh={true} onPullToRefresh={refresh}>
        {list.map((e, i) => (
          <Row key={i} text={e} />
        ))}
      </PageMain>
      <PageFooter>
        <Footer />
      </PageFooter>
    </PageLayout>
  );
}
