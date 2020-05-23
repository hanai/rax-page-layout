import { CSSProperties } from '@rax-types/rax';
import { isIOS } from '../../utils/ua';

export const nativeStyle: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
    ...(isIOS() ? { WebkitOverflowScrolling: 'touch' } : null),
  },
  transformView: {
    overflow: 'visible',
    flexDirection: 'column',
  },
};

export const betterScrollStyle: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
    overflow: 'hidden',
  },
};
