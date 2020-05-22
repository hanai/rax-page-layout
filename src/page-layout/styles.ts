import { CSSProperties } from '@rax-types/rax';
import { isWeex } from 'universal-env';

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    ...(isWeex
      ? {
          flex: 1,
        }
      : null),
  },
};

export default styles;
