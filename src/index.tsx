export { default as PageLayout } from './page-layout';
export { default as PageMain } from './page-main';
export { default as PageHeader } from './page-header';
export { default as PageFooter } from './page-footer';

import PageLayout from './page-layout';
import PageMain from './page-main';
import PageHeader from './page-header';
import PageFooter from './page-footer';

import './utils/polyfill';

export default {
  PageLayout,
  PageMain,
  PageHeader,
  PageFooter,
};
