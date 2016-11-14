import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'

import { default as en } from './lang-en';
import { default as de } from './lang-de';

addLocaleData([
  ...enLocaleData,
  ...deLocaleData,
]);

export default {
  en,
  de,
};
