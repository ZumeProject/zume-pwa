import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';
import languages from 'I18n/languages.json';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    code: 'en',
    rtl: false,
  },
  reducers: {
    changeLanguage(state, action) {
      const { code } = action.payload;
      if (state.code !== code) {
        state.code = code;
        const languageDetails = languages.find((l) => l.code === i18n.language);
        state.rtl = !!languageDetails?.rtl;
      }
      return state;
    },
  },
});

export const selectLanguage = (state) => state.language;

export default languageSlice;
