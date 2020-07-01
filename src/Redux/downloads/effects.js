import downloadsSlice, {
  selectDownloadingAssetByUrl,
  getNextQueuedDownload,
  getDownloadingCount
} from './index';
import { putInCache, deleteFromCache } from './cache';
import ProgressReportFetcher from './ProgressReportFetcher';
import {
  tryPersistWithoutPromptingUser,
  persist as persistStorage
} from './storage';
import throttle from 'lodash/throttle';

const MAX_CONCURRENT_DOWNLOADS = 2;

export function download({ key, url }) {
  return async (dispatch, getState) => {
    dispatch(downloadsSlice.actions.downloadQueued({ key, url }));
    // only immediately download if concurrent downloads isn't maxed out.
    if (getDownloadingCount(getState()) <= MAX_CONCURRENT_DOWNLOADS) {
      dispatch(startDownload({ key, url }));
    }
  };
}

function startDownload({ key, url }) {
  // console.time();
  return async (dispatch, getState) => {
    const progressFetcher = new ProgressReportFetcher(
      throttle(({ loaded, total }) => {
        // console.timeLog();
        return dispatch(
          downloadsSlice.actions.downloadProgressed({ url, loaded, total })
        );
      }, 500)
    );
    const info = { key, url };
    try {
      dispatch(downloadsSlice.actions.downloadStarted(info));
      const request = new Request(url);
      // We use the progress fetcher first to get
      // a progress update, but then we need to refetch
      // and get the body from the cache in order to properly
      // get CORS, headers, etc. in the response so that Safari
      // can playback from the cache.
      // TODO verify this does not double download/affect performance
      await progressFetcher.fetch(request);
      const response = await fetch(request);
      await putInCache(request, response);
      dispatch(downloadsSlice.actions.downloadCompleted(info));
      dispatch(estimateUsage());
    } catch (e) {
      const { message, name } = e;
      dispatch(downloadsSlice.actions.downloadCancelled(info));
      dispatch(
        downloadsSlice.actions.downloadErrored({
          url: info.url,
          error: { message, name }
        })
      );
    } finally {
      startNextDownloadIfPossible(dispatch, getState());
    }
  };
}

function startNextDownloadIfPossible(dispatch, state) {
  const hasCapacity = getDownloadingCount(state) <= MAX_CONCURRENT_DOWNLOADS;
  const nextQueuedDownload = getNextQueuedDownload(state);

  if (hasCapacity && nextQueuedDownload) {
    dispatch(startDownload(nextQueuedDownload));
  }
}

export function cancelDownload({ url }) {
  return async (dispatch, getState) => {
    // clear from queue and downloading
    const downloadingAsset = selectDownloadingAssetByUrl(getState(), url);
    if (downloadingAsset?.progressFetcher) {
      const { progressFetcher } = downloadingAsset;
      progressFetcher.cancel();
    }
    dispatch(downloadsSlice.actions.downloadCancelled({ url }));

    // clear from cache
    await deleteFromCache(url);

    // clear from offlineAssets list
    dispatch(downloadsSlice.actions.downloadDeleted({ url }));

    // kick off next download
    startNextDownloadIfPossible(dispatch, getState());
  };
}

export function deleteDownload({ key, url }) {
  return async dispatch => {
    await deleteFromCache(url);
    dispatch(downloadsSlice.actions.downloadDeleted({ key, url }));
    dispatch(estimateUsage());
  };
}

const { usageEstimated } = downloadsSlice.actions;
export function estimateUsage() {
  return async dispatch => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      let estimate = await navigator.storage.estimate();
      dispatch(usageEstimated(estimate));
    }
  };
}

export function persisted() {
  return async dispatch => {
    const persist = await tryPersistWithoutPromptingUser();
    dispatch(downloadsSlice.actions.persistChecked(persist));
  };
}

export function persist() {
  return async dispatch => {
    await persistStorage(); // trigger prompt
    const result = await tryPersistWithoutPromptingUser();
    dispatch(downloadsSlice.actions.persistChecked(result));
  };
}
