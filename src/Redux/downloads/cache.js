import sessions from 'Sessions/index.json';
const cacheName = sessions.assetCacheName; // TODO what if it's not specified?

export async function getCache() {
  return caches.open(cacheName);
}

export async function deleteCache() {
  return caches.delete(cacheName);
}

export async function putInCache(request, response) {
  const cache = await getCache();
  return await cache.put(request, response);
}

export async function addToCache(url) {
  const cache = await getCache();
  return await cache.add(url);
}

export async function deleteFromCache(url) {
  const cache = await getCache();
  return await cache.delete(url);
}

export async function isCached(url) {
  const cache = await getCache();
  return await cache.match(url);
}

/**
 *
 * @param {boolean} urlsOnly whether or not to check for a url
 *                              or for the actual cached response.
 * @param {string} ext an optional extension to check for so you
 *                        get only files of certain types.
 *                        Include the leading period (e.g. ".mp4")
 */
export async function listCachedAssets(urlsOnly, ext) {
  // NOTE it might be better to store an index in indexeddb
  // Get a list of all of the caches for this origin
  const cacheNames = await caches.keys();
  const result = [];

  for (const name of cacheNames) {
    // Open the cache
    const cache = await caches.open(name);

    // Get a list of entries. Each item is a Request object
    for (const request of await cache.keys()) {
      // If the request URL matches, add the response to the result
      if (!ext || request.url.endsWith(ext)) {
        if (urlsOnly) {
          result.push(request.url);
        } else {
          result.push(await cache.match(request));
        }
      }
    }
  }

  return result;
}
