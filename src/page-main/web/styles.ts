import { CSSProperties } from '@rax-types/rax';
import { isIOS } from '../../utils/ua';

const styles: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
    ...(isIOS() ? { WebkitOverflowScrolling: 'touch' } : null),
  },
  transformView: {
    overflow: 'visible',
  },
};

export default styles;
