import { isWeex } from 'universal-env';

export const getViewportHeight = (cb: (height: number) => any) => {
  if (isWeex) {
    var dom = require('@weex-module/dom');
    dom.getComponentRect('viewport', (data) => {
      if (data.result) {
        const height = data.size.height;
        cb(height);
      }
    });
  } else {
    const html = document.documentElement;
    const height = (750 / html.clientWidth) * html.clientHeight;
    cb(height);
  }
};
