import {
  createElement,
  CSSProperties,
  useEffect,
  useReducer,
  useRef,
  memo,
  useCallback,
} from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import Icon from 'rax-icon';

// @ts-ignore
import animate from 'universal-animation';
import findDOMNode from 'rax-find-dom-node';

import styles from './styles';
import { PullToRefreshState } from '../../types';
import { noop } from '../../utils';

export interface PullToRefreshIndicatorProps {
  style?: CSSProperties;
  state: PullToRefreshState;
}

const rotateView = (
  ref,
  config: {
    start: number;
    end: number;
    delay?: number;
    duration?: number;
  },
  cb?: () => any
) => {
  const { start, end, duration = 100, delay = 0 } = config;
  animate(
    {
      props: [
        {
          element: findDOMNode(ref.current),
          property: 'transform.rotateZ',
          easing: 'easeOutSine',
          duration,
          start: start,
          end: end,
          delay,
        },
      ],
    },
    () => {
      cb && cb();
    }
  );
};

const PullToRefreshIndicator = (props: PullToRefreshIndicatorProps) => {
  const { style, state } = props;
  const oldStateRef = useRef<PullToRefreshState>(state);

  const reloadViewRef = useRef(null);
  const arrowViewRef = useRef(null);

  const msg = {
    [PullToRefreshState.PULLING]: '下拉刷新',
    [PullToRefreshState.READY]: '松开刷新',
    [PullToRefreshState.REFRESHING]: '刷新中',
  }[state];

  const loopRotateReloadIcon = () => {
    console.log('xx');
    rotateView(
      reloadViewRef,
      { start: 0, end: 360, delay: 100, duration: 400 },
      () => {
        if (oldStateRef.current === PullToRefreshState.REFRESHING) {
          loopRotateReloadIcon();
        }
      }
    );
  };

  useEffect(() => {
    if (
      oldStateRef.current === PullToRefreshState.PULLING &&
      state === PullToRefreshState.READY
    ) {
      rotateView(arrowViewRef, { start: 0, end: 180 });
    } else if (
      oldStateRef.current === PullToRefreshState.READY &&
      state === PullToRefreshState.PULLING
    ) {
      rotateView(arrowViewRef, { start: 180, end: 0 });
    } else if (state === PullToRefreshState.REFRESHING) {
      loopRotateReloadIcon();
    }
    oldStateRef.current = state;
  }, [state]);

  return (
    <View style={Object.assign(styles.container, style)}>
      {state === PullToRefreshState.PULLING ||
      state === PullToRefreshState.READY ? (
        <View style={styles.iconContainer}>
          <View ref={arrowViewRef} style={styles.arrowView}>
            <Icon
              fontFamily="iconfont"
              style={styles.arrow}
              source={{
                uri: '//at.alicdn.com/t/font_1794489_d07h8hzchqr.ttf',
                codePoint: '\ue7ee',
              }}
            />
          </View>
        </View>
      ) : null}
      {state === PullToRefreshState.REFRESHING ? (
        <View style={styles.iconContainer}>
          <View ref={reloadViewRef} style={styles.reloadView}>
            <Icon
              fontFamily="iconfont"
              style={styles.reload}
              source={{
                uri: '//at.alicdn.com/t/font_1794489_d07h8hzchqr.ttf',
                codePoint: '\ue788',
              }}
            />
          </View>
        </View>
      ) : null}
      <Text style={styles.text}>{msg}</Text>
    </View>
  );
};

PullToRefreshIndicator.defaultProps = {
  style: {},
};

export const height = styles.container.height as number;

export default PullToRefreshIndicator;
