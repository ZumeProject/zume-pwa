import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import settings, { selectSettings } from 'Redux/settings';
import store from 'Redux/store';
import LanguageSelector from 'Components/shared/LanguageSelector';
import { useAppTranslation } from 'Components/zume/translationHooks';

export default function FontSettings() {
  const trans = useAppTranslation();
  const { fontSizeCode, fontSize } = useSelector(selectSettings);
  const fontSizes = [
    {
      enDisplayName: 'Extra Small',
      code: 'xs',
      nativeName: 'Extra Small',
    },
    {
      enDisplayName: 'Small',
      code: 'sm',
      nativeName: 'Small',
    },
    {
      enDisplayName: 'Medium',
      code: 'md',
      nativeName: 'Medium',
    },
    {
      enDisplayName: 'Large',
      code: 'lg',
      nativeName: 'Large',
    },
    {
      enDisplayName: 'Extra Large',
      code: 'xl',
      nativeName: 'Extra Large',
    },
  ];

  useEffect(() => {
    const html = document.querySelector('html');
    html.style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <LanguageSelector
      selected={fontSizeCode}
      languages={fontSizes}
      title={trans('Select Font Size')}
      onChange={(font) => {
        const { changeFontSize } = settings.actions;
        store.dispatch(changeFontSize({ sizeCode: font }));
      }}
    />
  );
}
