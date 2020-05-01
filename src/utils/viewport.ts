import { isWeex } from 'universal-env';

let viewportHeightCache;

export const getViewportHeight = (cb: (height: number) => any) => {
  if (viewportHeightCache) {
    return cb(viewportHeightCache);
  }

  if (isWeex) {
    var dom = require('@weex-module/dom');
    dom.getComponentRect('viewport', (data) => {
      if (data.result) {
        const height = data.size.height;
        viewportHeightCache = height;
        cb(height);
      }
    });
  } else {
    const html = document.documentElement;
    const height = (750 / html.clientWidth) * html.clientHeight;
    viewportHeightCache = height;
    cb(height);
  }
};
