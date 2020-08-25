import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

import language from 'Redux/language';
import store from 'Redux/store';

// Following this guide: https://react.i18next.com/latest/using-with-hooks

i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: (process.env.PUBLIC_URL || '') + '/locales/{{lng}}/{{ns}}.json',
    },
    keySeparator: '|',
    nsSeparator: '}',
    // don't try to load en-US locale, just en for example.
    // see: https://github.com/i18next/i18next/issues/964
    load: 'languageOnly',
  })
  .then(syncI18nAndReduxLanguage);

i18n.loadNamespaces('zume');
i18n.loadNamespaces('zume-assets');

export default i18n;

export function syncI18nAndReduxLanguage() {
  const { changeLanguage } = language.actions;
  store.dispatch(changeLanguage({ code: i18n.language }));
}
