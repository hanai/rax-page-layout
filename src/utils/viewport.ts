export const getViewportHeight = (cb: (height: number) => any) => {
  const html = document.documentElement;
  const height = (750 / html.clientWidth) * html.clientHeight;
  cb(height);
};
