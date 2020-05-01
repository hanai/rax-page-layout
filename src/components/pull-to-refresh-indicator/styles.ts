import { CSSProperties } from '@rax-types/rax';

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: 80,
    width: 750,
    position: 'absolute',
    transform: 'translateY(-80rpx)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowView: {},
  reloadView: {},
  arrow: {
    color: '#666',
    fontSize: 36,
  },
  reload: {
    color: '#666',
    fontSize: 36,
  },
  text: {
    fontSize: 28,
    color: '#666',
  },
};

export default styles;
