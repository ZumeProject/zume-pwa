import React from 'react';
import LanguageSelector from 'Components/shared/LanguageSelector';
import languages from 'I18n/languages.json';
import { useTranslation } from 'react-i18next';
import { useAppTranslation } from 'Components/zume/translationHooks';

export default function LanguageSettings() {
  const { i18n } = useTranslation();
  const trans = useAppTranslation();
  return (
    <LanguageSelector
      selected={i18n.language}
      languages={languages}
      title={trans('Select Language')}
      onChange={lng => {
        i18n.changeLanguage(lng);
      }}
    />
  );
}
