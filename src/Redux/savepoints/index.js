import { createSlice } from '@reduxjs/toolkit';

const savepointsSlice = createSlice({
  name: 'savepoints',
  initialState: {
    bookmarks: [],
    checkpoint: null,
  },
  reducers: {
    changeCheckpoint: (state, action) => {
      const { checkpoint } = action.payload;
      state.checkpoint = checkpoint;
      return state;
    },
    changeBookmarks: (state, action) => {
      const { bookmarks } = action.payload;
      state.bookmarks = bookmarks;
      return state;
    },
  },
});

export const selectSavepoints = (state) => state.savepoints;

export default savepointsSlice;
