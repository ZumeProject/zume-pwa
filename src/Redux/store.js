import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  createAction
} from '@reduxjs/toolkit';
import counterSlice from './counter';
import languageSlice from './language';
import lifecycleSlice from './lifecycle';
import sessionsSlice from './sessions';
import downloadsSlice from './downloads';
import liveSlice from './live';
import groupsSlice from './groups';
import formsSlice from './forms';
import { deleteCache } from './downloads/cache';

/* Setup required to enable offline redux */
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const persistConfig = {
  key: 'root',
  storage
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const reducers = combineReducers({
  counter: counterSlice.reducer,
  language: languageSlice.reducer,
  lifecycle: lifecycleSlice.reducer,
  sessions: sessionsSlice.reducer,
  downloads: downloadsSlice.reducer,
  live: liveSlice.reducer,
  groups: groupsSlice.reducer,
  forms: formsSlice.reducer
});

export const reset = createAction('RESET');
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
    deleteCache();
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(rootReducer)
);

/* Now configure the store */

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
    offlineMiddleware
  ],
  enhancers: [offlineEnhanceStore]
});

export const persistor = persistStore(store);
export default store;
