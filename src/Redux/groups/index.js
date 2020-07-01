import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    current: null,
    list: []
  },
  reducers: {
    groupsLoaded(state, action) {
      state.list = action.payload;
      state.current = null;
      return state;
    },
    groupSelected(state, action) {
      state.current = action.payload;
      return state;
    },
    groupCreated(state, action) {
      state.list.push(action.payload);
      return state;
    },
    groupUpdated(state, action) {
      const { groupIndex, group } = action.payload;
      state.list.splice(groupIndex, 1, group);
      return state;
    },
    groupDeleted(state, action) {
      const { groupIndex } = action.payload;
      state.list.splice(groupIndex, 1);
      // TODO handle re-indexing of groups on deletion.
      // and what happens to current?
      return state;
    }
  }
});

export const selectCurrentGroup = state => state.current;
export const selectGroupsList = state => state.list;

export default groupsSlice;
