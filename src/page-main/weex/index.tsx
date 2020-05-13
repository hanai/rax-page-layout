import { createElement, RaxNode, useRef, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView, { ScrollViewProps } from 'rax-scrollview';
import findDOMNode from 'rax-find-dom-node';

import styles from './styles';

import { toUnitValue } from '../../utils/unit';

import RefreshControl from 'rax-refreshcontrol';

export interface PageMainProps extends ScrollViewProps {
  children: RaxNode;
  isRefreshing?: boolean;
  hasPullToRefresh?: boolean;
  onPullToRefresh?: () => any;
}

const PageMain = (props: PageMainProps) => {
  const { children, hasPullToRefresh, isRefreshing } = props;

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <RefreshControl
          onRefresh={props.onPullToRefresh}
          refreshing={isRefreshing}
        >
          <Text>下拉刷新</Text>
        </RefreshControl>
        <Text>{isRefreshing}</Text>
        {children}
      </ScrollView>
    </View>
  );
};

PageMain.defaultProps = {
  hasPullToRefresh: false,
};

export default PageMain;
