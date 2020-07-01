import React from 'react';

import { storiesOf } from '@storybook/react';

import { makeStyles } from '@material-ui/core/styles';

import LanguageSelector from './LanguageSelector';
import { action } from '@storybook/addon-actions';

const languages = [
  {
    enDisplayName: 'English',
    code: 'en',
    nativeName: 'English'
  },
  {
    enDisplayName: 'Indonesian',
    code: 'id',
    nativeName: 'Bahasa Indonesia'
  },
  {
    enDisplayName: 'Arabic',
    code: 'ar',
    nativeName: 'العربية'
  }
];

const classes = makeStyles(theme => ({
  fullWidth: {
    width: '50%',
    maxWidth: '50%',
    backgroundColor: theme.palette.background.paper
  }
}));

function LanguageSelectorWithStyles({ languages }) {
  return (
    <LanguageSelector
      languages={languages}
      selected={'id'}
      className={classes().fullWidth}
    />
  );
}

storiesOf('LanguageSelector', module)
  .add('renders with list of languages', () => (
    <LanguageSelector languages={languages} />
  ))
  .add('renders with a selected language', () => (
    <LanguageSelector languages={languages} selected={'en'} />
  ))
  .add('emits an event when selecting a language', () => (
    <LanguageSelector languages={languages} onChange={action('clicked')} />
  ))
  .add('with class styles', () => (
    <LanguageSelectorWithStyles languages={languages} />
  ));
