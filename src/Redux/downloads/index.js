import { createSlice, createSelector } from '@reduxjs/toolkit';

/**
 * The downloads slice is for handling the state and logic
 * around making assets available offline.
 *
 * It is used to help determine which sessions
 * (with all its assets) are available offline,
 * but it is not responsible for that logic.
 *
 * It simply operates on {key, url} that needs to be
 * available offline.
 */

const downloadsSlice = createSlice({
  name: 'downloads',
  initialState: {
    queue: [],
    downloading: [],
    errors: {},
    offlineAssets: {},
    storage: {}
  },
  reducers: {
    downloadQueued(state, action) {
      addObjByUrl(state.queue, action.payload);
      return state;
    },
    downloadStarted(state, action) {
      const { url } = action.payload;
      state.queue = removeByUrl(state.queue, url);
      addObjByUrl(state.downloading, action.payload);
      return state;
    },
    downloadProgressed(state, action) {
      const { url, loaded, total } = action.payload;
      state.downloading = state.downloading.map(d => {
        if (d.url === url) {
          d.loaded = loaded;
          d.total = total;
        }
        return d;
      });
      return state;
    },
    downloadErrored(state, action) {
      const { url, error } = action.payload;
      let errors = state.errors || {};
      errors[url] = error;
      state.errors = errors;
      return state;
    },
    downloadCancelled(state, action) {
      const { url } = action.payload;
      state.queue = removeByUrl(state.queue, url);
      state.downloading = removeByUrl(state.downloading, url);
      state = clearError(state, url);
      return state;
    },
    downloadCompleted(state, action) {
      const { url } = action.payload;
      state.downloading = removeByUrl(state.downloading, url);
      state.offlineAssets[url] = action.payload;
      state = clearError(state, url);
      return state;
    },
    downloadDeleted(state, action) {
      const { url } = action.payload;
      delete state.offlineAssets[url];
      state = clearError(state, url);
      return state;
    },
    usageEstimated(state, action) {
      const { quota, usage } = action.payload;
      state.storage = state.storage || {};
      state.storage.quota = quota;
      state.storage.usage = usage;
      return state;
    },
    persistChecked(state, action) {
      state.storage = state.storage || {};
      state.storage.persisted = action.payload;
      return state;
    }
  }
});

// Needed for migration purposes
// because we changed state.error to state.errors
// TODO clean up if we have redux-persist migration capabilities.
function clearError(state, url) {
  let errors = state.errors || {};
  delete errors[url];
  state.errors = errors;
  return state;
}

function addObjByUrl(arr, obj) {
  if (!arr || !obj) return;
  for (let i in arr) {
    if (arr[i].url === obj.url) {
      return;
    }
  }
  arr.push(obj);
}

function removeByUrl(arr, url) {
  return arr.filter(a => a.url !== url);
}

export const selectDownloads = state => state.downloads;
export const selectOfflineAssets = createSelector(
  selectDownloads,
  downloads => {
    return downloads.offlineAssets;
  }
);
export const selectIsAssetOffline = createSelector(
  selectOfflineAssets,
  (_, url) => url,
  (offlineAssets, url) => {
    return offlineAssets.hasOwnProperty(url);
  }
);
export const selectErrors = createSelector(
  selectDownloads,
  downloads => downloads.errors
);
export const selectIsAssetInError = createSelector(
  selectErrors,
  (_, url) => url,
  (errors, url) => errors.hasOwnProperty(url)
);

export const selectStorage = createSelector(
  selectDownloads,
  downloads => downloads.storage
);
export const selectQueue = createSelector(
  selectDownloads,
  downloads => downloads.queue
);
export const selectDownloading = createSelector(
  selectDownloads,
  downloads => downloads.downloading
);
export const selectDownloadingAssetByUrl = createSelector(
  selectDownloading,
  (_, url) => url,
  (downloading, url) => {
    for (const d of downloading) {
      if (d.url === url) {
        return d;
      }
    }
    return null;
  }
);
export const getNextQueuedDownload = createSelector(
  selectDownloads,
  downloads => {
    return downloads.queue[0];
  }
);
export const getDownloadingCount = createSelector(
  selectDownloads,
  downloads => {
    return downloads.downloading.length;
  }
);

export default downloadsSlice;
