import { CSSProperties } from '@rax-types/rax';

const styles: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  transformView: {
    overflow: 'visible',
  },
};

export default styles;
