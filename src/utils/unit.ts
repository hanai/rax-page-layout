export const toUnitValue = (value: number) => {
  const docClientWidth = document.documentElement.clientWidth;
  return (750 / docClientWidth) * value;
};
