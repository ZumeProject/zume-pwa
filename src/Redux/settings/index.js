import { createSlice } from '@reduxjs/toolkit';

const FONT_SIZE_UNIT = 'em';

const fontSizeMap = {
  xs: 0.65,
  sm: 0.8,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    fontSize: 1 + FONT_SIZE_UNIT,
    fontSizeCode: 'md',
  },
  reducers: {
    changeFontSize: (state, action) => {
      const { sizeCode } = action.payload;
      if (fontSizeMap[sizeCode]) {
        state.fontSize = fontSizeMap[sizeCode] + FONT_SIZE_UNIT;
        state.fontSizeCode = sizeCode;
      }
      return state;
    },
  },
});

export const selectSettings = (state) => state.settings;

export default settingsSlice;
