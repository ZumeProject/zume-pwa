import { createSlice, createSelector } from '@reduxjs/toolkit';

/**
 * User form input is stored in forms/data.
 * forms/meta contains meta information about forms.
 */
const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    data: {},
    meta: {}
  },
  reducers: {
    formDataUpdated(state, action) {
      const { name, data } = action.payload;
      const current = state.data || {};
      current[name] = data;
      state.data = current;
      return state;
    },
    formDataDeleted(state, action) {
      const { name } = action.payload;
      delete state.data[name];
      return state;
    }
  }
});

export const { formDataUpdated, formDataDeleted } = formsSlice.actions;

export const selectForms = state => state.forms;
export const selectFormData = createSelector(selectForms, forms => forms.data);
export const selectFormsByName = createSelector(
  selectFormData,
  (_, names) => names,
  (formData, names) => {
    let result = {};
    if (names) {
      names.forEach(n => (result[n.name] = formData[n.name]));
    }
    return result;
  }
);

export default formsSlice;
