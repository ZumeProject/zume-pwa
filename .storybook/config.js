import { configure, addDecorator, addParameters } from '@storybook/react';
import requireContext from 'require-context.macro';
import '@storybook/addon-console';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { withI18next } from 'storybook-addon-i18next';

import React from 'react';
import { Provider } from 'react-redux';
import store from 'Redux/store';
addDecorator(story => <Provider store={store}>{story()}</Provider>);

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
        lng: 'en',
        whitelist: ['en', 'id'],
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        react: {
            useSuspense: false // for our tests we don't need the fallback
        },
        keySeparator: '|',
        nsSeparator: '}'
    });

addDecorator(
    withI18next({
        i18n,
        languages: {
            en: 'English',
            id: 'Bahasa Indonesia',
            ar: 'Arabic'
        }
    })
);

addParameters({
    backgrounds: [
        { name: 'gray', value: '#C8C8C8', default: true },
        { name: 'bright blue', value: '#2CACE2' }
    ]
});

const req = requireContext('../src/Components/', true, /.*\.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);