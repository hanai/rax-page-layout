import { isWeex } from 'universal-env';

let docClientWidth;

export const toUnitValue = (value: number) => {
  if (isWeex) {
    return value;
  } else {
    docClientWidth = docClientWidth || document.documentElement.clientWidth;
    return (750 / docClientWidth) * value;
  }
};
