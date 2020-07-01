import { createSlice, createSelector } from '@reduxjs/toolkit';
import sessions from 'Sessions/index.json';
import {
  selectOfflineAssets,
  selectDownloading,
  selectQueue,
  selectErrors
} from '../downloads';
import { normalizeAssetUrl } from 'Components/zume/translationHooks';

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    loading: false,
    meta: sessions,
    content: [],
    about: null,
    error: null
  },
  reducers: {
    sessionsContentLoading(state) {
      state.loading = true;
      state.error = null;
      return state;
    },
    sessionsContentLoaded(state, action) {
      state.content = action.payload;
      state.loading = false;
      return state;
    },
    sessionsContentFailedToLoad(state, action) {
      state.content = [];
      state.error = action.payload;
      return state;
    },
    aboutContentLoaded(state, action) {
      state.about = action.payload;
      return state;
    }
  }
});

export default sessionsSlice;
export const {
  sessionsContentLoading,
  sessionsContentLoaded,
  sessionsContentFailedToLoad,
  aboutContentLoaded
} = sessionsSlice.actions;

export const selectSessions = state => state.sessions;
export const selectAbout = createSelector(selectSessions, sessions => {
  return sessions.about;
});

export const selectSession = createSelector(
  selectSessions,
  (_, sessionId) => sessionId,
  (sessions, sessionId) => {
    return sessions.content[sessionId];
  }
);

// TODO find a better way to specify id that can be consistently used
// NOTE the technique here is used in other selectors in this file too...
export const getSessionTitles = createSelector([selectSessions], sessions => {
  return sessions.content.map((s, i) => ({ id: `${i}`, title: s.t }));
});

export const getSessionPaths = createSelector([selectSessions], sessions => {
  return sessions.meta.sessions;
});

function totalAssetSize(assets, localizedAssetMapper) {
  return assets.reduce((acc, current) => {
    const size = current.size || 0;
    return acc + size;
  }, 0);
}

/**
 * Filter out certain types of session assets that
 * cannot be downloaded for offline use such as
 * external links
 */
export function filterToDownloadableAssets(assets) {
  return assets.filter(a => {
    return a.type !== 'link';
  });
}

/**
 * Filters the list of assets by url matches in the offlineAssets set.
 * @param {array} assets
 * @param {set} offlineAssets
 */
function filterToDownloadedAssets(assets, offlineAssets) {
  return assets.filter(a => {
    const url = a.url;
    return offlineAssets.hasOwnProperty(url);
  });
}

/**
 * Filters the list of assets by url matches in the offlineAssets set.
 * @param {array} assets
 * @param {set} errors
 */
function filterToAssetsInError(assets, errors) {
  return assets.filter(a => {
    const url = a.url;
    return errors?.hasOwnProperty(url);
  });
}

/**
 * Filters the list of assets by url matches to the list of
 * assets currently downloading. It also sets the size to be
 * the current downloading progress.
 * @param {array} assets
 * @param {array} downloading
 */
function filterToDownloadingAssets(assets, downloading) {
  const downloadingAssetsWithProgress = assets.map(a => {
    for (let d of downloading) {
      if (d.url === a.url) {
        return {
          ...a,
          size: d.loaded
        };
      }
    }
    return null;
  });

  return downloadingAssetsWithProgress.filter(a => a !== null);
}

/**
 * Filters the list of assets to urls that are
 * in the list of assets currently queued.
 * @param {array} assets
 * @param {array} queue
 */
function filterToQueuedAssets(assets, queue) {
  return assets.filter(a => {
    return queue.findIndex(q => a.url === q.url) > -1;
  });
}

export const selectSessionSizes = createSelector(
  selectSessions,
  (_, localizedAssetMapper) => localizedAssetMapper,
  selectOfflineAssets,
  selectErrors,
  selectDownloading,
  selectQueue,
  (
    sessions,
    localizedAssetMapper,
    offlineAssets,
    errors,
    downloading,
    queue
  ) => {
    return sessions.content.map((s, i) => {
      const assetReferences = s.assets.map(a => {
        const localizedAsset = localizedAssetMapper(a.key) || {};
        localizedAsset.type = a.type;
        localizedAsset.url = normalizeAssetUrl(
          localizedAsset.url,
          localizedAssetMapper
        );
        return localizedAsset;
      });
      const downloadableAssets = filterToDownloadableAssets(assetReferences);
      const downloadedAssets = filterToDownloadedAssets(
        downloadableAssets,
        offlineAssets
      );
      const downloadingAssets = filterToDownloadingAssets(
        downloadableAssets,
        downloading
      );
      const queuedAssets = filterToQueuedAssets(downloadableAssets, queue);
      const assetsInError = filterToAssetsInError(downloadableAssets, errors);

      const offlineAccess =
        downloadedAssets.length === downloadableAssets.length;
      const currentOfflineSize =
        totalAssetSize(downloadedAssets) + totalAssetSize(downloadingAssets);
      const sessionSize = totalAssetSize(downloadableAssets);
      const offlineProgress = offlineAccess
        ? 100
        : Math.round((currentOfflineSize / sessionSize) * 100);
      const isDownloading =
        offlineProgress &&
        offlineProgress !== 100 &&
        downloadingAssets.length > 0;
      const isQueued = queuedAssets.length && !isDownloading;
      const hasErrors = assetsInError.length > 0;
      const assetsInErrorWithErrors = assetsInError.map(aie => ({
        ...aie,
        error: errors[aie.url]
      }));

      return {
        id: `${i}`,
        t: s.t,
        assetReferences,
        size: sessionSize,
        offlineAccess,
        offlineProgress,
        isDownloading,
        isQueued,
        hasErrors,
        assetsInError: assetsInErrorWithErrors
      };
    });
  }
);

export const selectSessionAssets = createSelector([selectSession], session => {
  return session.assets;
});

export function loadSessions() {
  return async (dispatch, getState) => {
    try {
      const paths = getSessionPaths(getState());
      dispatch(sessionsContentLoading());

      // dynamically load about content
      const aboutContent = await import(`Sessions/about.json`);
      if (aboutContent) {
        const { assets, sections, t } = aboutContent;
        dispatch(aboutContentLoaded({ assets, sections, t }));
      }

      // dynamically load session content
      const content = await Promise.all(
        paths.map(p => import(`Sessions/${p}`))
      );
      // NOTE since we are importing, we get back ES6 modules
      // but we can only persist JSON objects, so the following does so
      // TODO find an alternative way to do this that doesn't
      // require us to pick out fields from the session content.
      dispatch(
        sessionsContentLoaded(
          content.map(c => {
            const { t, assets, forms, sections } = c;
            return { t, assets, forms, sections };
          })
        )
      );
    } catch (err) {
      dispatch(sessionsContentFailedToLoad(err));
    }
  };
}
