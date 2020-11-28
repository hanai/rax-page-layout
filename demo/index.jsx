import { createElement, render, useRef, useState } from 'rax';
import DriverUniversal from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from 'rax-textinput';

import { PageLayout, PageHeader, PageFooter, PageMain } from 'rax-page-layout';
import styles from './styles';

const LIST_SIZE = 50;

const App = () => {
  const [list, setList] = useState(() =>
    Array(LIST_SIZE)
      .fill()
      .map((_, i) => i)
  );

  const [index, setIndex] = useState(1);

  const scrollerRef = useRef();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setList((list) =>
      list
        .slice(0, LIST_SIZE)
        .map(
          (_, index) =>
            index + parseInt(Math.random() * LIST_SIZE, 10) - LIST_SIZE / 2
        )
    );
    setIndex((index) => index + 1);
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

  const Row = ({ text, ...props }) => {
    const [bgColor, setBgColor] = useState('#fff');
    const handleClick = () => {
      setBgColor('#00f');
      setTimeout(() => {
        setBgColor('#fff');
      }, 2000);
    };
    return (
      <View
        className="row"
        onClick={handleClick}
        style={{ ...styles.rowItem, backgroundColor: bgColor }}
        {...props}
      >
        <Text>{text}</Text>
      </View>
    );
  };

  const handleClickScrollToBottom = () => {
    if (scrollerRef.current) {
      const rows = document.getElementsByClassName('row');
      scrollerRef.current.scrollToElement(rows[rows.length - 1], 300);
    }
  };

  return (
    <PageLayout>
      <PageHeader>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
      </PageHeader>
      <PageMain
        betterScroll={true}
        isRefreshing={isRefreshing}
        hasPullToRefresh={true}
        onPullToRefresh={refreshAsync}
        scrollerRef={scrollerRef}
      >
        <View style={styles.listContainer}>
          {list.map((val, i) => {
            if (i == 3) {
              return (
                <Row
                  key={i}
                  onClick={handleClickScrollToBottom}
                  text="scrollToBottom"
                ></Row>
              );
            } else {
              return <Row key={i} text={val} />;
            }
          })}
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
