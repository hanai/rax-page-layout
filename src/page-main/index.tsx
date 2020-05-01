import WeexPageMain from './weex';
import WebPageMain from './web';
import { isWeb, isWeex } from 'universal-env';

let PageMain;

if (isWeb) {
  PageMain = WebPageMain;
} else if (isWeex) {
  PageMain = WeexPageMain;
} else {
  PageMain = WebPageMain;
}

export default PageMain;
