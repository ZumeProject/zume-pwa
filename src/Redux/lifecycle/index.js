import { createSlice } from '@reduxjs/toolkit';

const lifecycleSlice = createSlice({
  name: 'lifecycle',
  initialState: {
    firstVisit: null,
    updateAvailable: false,
    installable: false,
    installing: false,
    deferredPrompt: null,
    standalone: false,
    workbox: null,
    externalServiceWorker: null
  },
  reducers: {
    firstVisitChecked(state) {
      if (state.firstVisit === null) {
        state.firstVisit = true;
      } else if (state.firstVisit) {
        state.firstVisit = false;
      }
      return state;
    },
    workboxReady(state, action) {
      state.workbox = action.payload;
      return state;
    },
    appInstallable(state, action) {
      state.deferredPrompt = action.payload;
      state.installable = true;
      return state;
    },
    appInstalling(state) {
      state.deferredPrompt = null;
      state.installing = true;
      return state;
    },
    appInstalled(state) {
      state.installable = false;
      state.installing = false;
      return state;
    },
    appUpdateDetected(state, action) {
      state.updateAvailable = true;
      return state;
    },
    appUpdated(state) {
      state.updateAvailable = false;
      state.externalServiceWorker = null;
      return state;
    },
    externalServiceWorkerDetected(state, action) {
      state.externalServiceWorker = action.payload;
      return state;
    },
    appIsStandalone(state) {
      state.standalone = true;
      return state;
    }
  }
});

export const selectLifecycle = state => state.lifecycle;

export default lifecycleSlice;
