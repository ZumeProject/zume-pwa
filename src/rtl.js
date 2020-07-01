import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import i18n from 'i18next';
import { syncI18nAndReduxLanguage } from './I18n';
import { selectLanguage } from 'Redux/language';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

export default RTL;

// Utilities for handling locale changes that require changing direction
// Material-UI requires changing the theme direction and body element direction.
// see https://material-ui.com/guides/right-to-left/

export function onRtlChange(rtl) {
  const body = document.querySelector('body');
  if (body.dir && !rtl) {
    body.dir = '';
  } else if (!body.dir && rtl) {
    body.dir = 'rtl';
  }
}

export const RTLTheme = createMuiTheme({
  ...theme,
  direction: 'rtl'
});

export const DirectionalOuterTheme = props => {
  const { rtl } = useSelector(selectLanguage);
  const onLanguageChanged = () => {
    let currentIsRTL = i18n.dir() === 'rtl' ? true : false;
    if (rtl !== currentIsRTL) {
      onRtlChange(currentIsRTL);
    }
    syncI18nAndReduxLanguage();
  };

  useEffect(() => {
    i18n.on('languageChanged', onLanguageChanged);
    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  });

  return (
    <ThemeProvider theme={rtl ? RTLTheme : theme}>
      {props.children}
    </ThemeProvider>
  );
};
