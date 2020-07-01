import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  getSectionAndPartFromIndex,
  getIndexFromSectionAndPart,
  getContentForSectionAndPart
} from 'Utils/session/sectionLength';

const liveSlice = createSlice({
  name: 'live',
  initialState: {
    sections: [],
    section: 0,
    part: 0
  },
  reducers: {
    reset(state) {
      state.sections = [];
      state.section = 0;
      state.part = 0;
      return state;
    },
    sectionsLoaded(state, action) {
      state.sections = action.payload;
      state.section = 0;
      state.part = 0;
      return state;
    },
    changed(state, action) {
      // This reducer is used when a user navigates
      // to a particular section or part.
      const { section, part } = action.payload;
      const sections = state.sections;
      if (isInBound(sections, section)) {
        state.section = section;
        const { parts } = sections[section];
        if (!parts) {
          // NOTE, some sections may have no parts.
          // We treat that as a special case as part index 0.
          state.part = 0;
        } else if (isInBound(parts, part)) {
          state.part = part;
        }
      }
      return state;
    },
    slideIndexChanged(state, action) {
      // This reducer is used when the user swipes through
      // a live session since in such cases we just have index information.
      const index = action.payload;
      const { section, part } = getSectionAndPartFromIndex(
        state.sections,
        index
      );
      state.section = section;
      state.part = part;
      return state;
    }
  }
});

export default liveSlice;
export const selectLive = state => {
  return state.live;
};
export const selectPartIndex = createSelector(selectLive, live => live.part);

export const selectCurrentPartContent = createSelector(selectLive, live => {
  const { sections, section, part } = live;
  return getContentForSectionAndPart(sections, section, part);
});
export const selectCurrentSlideIndex = createSelector(selectLive, live => {
  const { sections, section, part } = live;
  if (!sections) return -1;
  return getIndexFromSectionAndPart(sections, section, part);
});

// returns if the index is in the bounds of the array.
function isInBound(arr, i) {
  return arr && arr.length && i >= 0 && i < arr.length;
}
