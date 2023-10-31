import { createI18n } from 'vue-i18n';
import en from '../language/en.json';
import he from '../language/he.json';
import hi from '../language/hi.json';

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    he,
    hi
  }
});
