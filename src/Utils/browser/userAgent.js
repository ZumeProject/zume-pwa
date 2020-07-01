// Unfortunately iOS and Safari are sufficiently popular and unique to warrant
// specialized code or instructions to users for things like
// installing the app to their device. That is why this exists.

export function isSafariIOS() {
  return isSafariOnly() && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isSafariOnly() {
  const isSafari = navigator.userAgent.indexOf('Safari') > -1;
  const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  return isSafari && !isChrome;
}

export function isSamsung() {
  return navigator.userAgent.indexOf('SamsungBrowser') > -1;
}
