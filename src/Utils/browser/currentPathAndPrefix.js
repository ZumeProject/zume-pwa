/**
 * These functions are helpers that can extract the
 * current path as well as the basename prefix if it applies.
 * It is used by the Navigation UI to mark which view is active
 */

export default function currentPathAndPrefix(navigation, currentRoute) {
  let basename = navigation.basename || '/';
  let prefix = basename !== '/' ? basename : '';
  let currentPath = getCurrentPath(currentRoute);
  return { prefix, currentPath };
}

export function getCurrentPath(route) {
  let currentPath = null;
  if (!route) {
    currentPath = '/';
  } else {
    currentPath = route.url.pathname;
  }
  return currentPath;
}
