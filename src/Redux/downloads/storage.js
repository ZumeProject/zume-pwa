/**
 * Adapted from https://dexie.org/docs/StorageManager#summary
 */

const HAS_STORAGE = 'storage' in navigator;
export const NEVER = 'never';
export const PERSISTED = 'persisted';
export const PROMPT = 'prompt';

/** Check if storage is persisted already.
  @returns {Promise<boolean>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
*/
export function isStoragePersisted() {
  return HAS_STORAGE && navigator.storage.persisted
    ? navigator.storage.persisted()
    : undefined;
}

/** Tries to convert to persisted storage.
    @returns {Promise<boolean>} Promise resolved with true if successfully
    persisted the storage, false if not, and undefined if the API is not present.
  */
export function persist() {
  return HAS_STORAGE && navigator.storage.persist
    ? navigator.storage.persist()
    : undefined;
}

/** Queries available disk quota.
    @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEstimate
    @returns {Promise<{quota: number, usage: number}>} Promise resolved with
    {quota: number, usage: number} or undefined.
  */
export function showEstimatedQuota() {
  return HAS_STORAGE && navigator.storage.estimate
    ? navigator.storage.estimate()
    : undefined;
}

/** Tries to persist storage without ever prompting user.
    @returns {Promise<string>}
      "never" In case persisting is not ever possible. Caller don't bother
        asking user for permission.
      "prompt" In case persisting would be possible if prompting user first.
      "persisted" In case this call successfully silently persisted the storage,
        or if it was already persisted.
  */
export async function tryPersistWithoutPromptingUser() {
  if (!HAS_STORAGE || !navigator.storage.persisted) {
    return NEVER;
  }
  let persisted = await isStoragePersisted();
  if (persisted) {
    return PERSISTED;
  }
  if (!navigator.permissions || !navigator.permissions.query) {
    return PROMPT; // It MAY be successful to prompt. Don't know.
  }
  const permission = await navigator.permissions.query({
    name: 'persistent-storage'
  });
  if (permission.state === 'granted') {
    persisted = await persist();
    if (persisted) {
      return PERSISTED;
    } else {
      throw new Error('Failed to persist');
    }
  }
  if (permission.state === PROMPT) {
    return PROMPT;
  }
  return NEVER;
}
