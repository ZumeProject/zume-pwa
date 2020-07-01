import React from 'react';
import LanguageSelector from 'Components/shared/LanguageSelector';
import languages from 'I18n/languages.json';
import { useTranslation } from 'react-i18next';

export default function LanguageSettings() {
  const { t, i18n } = useTranslation();
  return (
    <LanguageSelector
      selected={i18n.language}
      languages={languages}
      title={t('language|select_header')}
      onChange={lng => {
        i18n.changeLanguage(lng);
      }}
    />
  );
}
