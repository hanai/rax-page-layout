export const isFirefox = () =>
  window.navigator.userAgent.indexOf('Firefox') > -1;

export const isIOS = () => /iPad|iPhone|iPod/.test(window.navigator.userAgent);
