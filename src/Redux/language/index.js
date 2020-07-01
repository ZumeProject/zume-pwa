import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    code: 'en',
    rtl: false
  },
  reducers: {
    changeLanguage(state, action) {
      const { code } = action.payload;
      if (state.code !== code) {
        state.code = code;
        state.rtl = i18n.dir(code) === 'rtl';
      }
      return state;
    }
  }
});

export const selectLanguage = state => state.language;

export default languageSlice;
