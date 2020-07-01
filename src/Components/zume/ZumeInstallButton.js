import React from 'react';
import lifecycleSlice, { selectLifecycle } from 'Redux/lifecycle';
import { useDispatch, useSelector } from 'react-redux';
import InstallOrUpdateButton from '../shared/lifecycle/InstallOrUpdateButton';

export default function ZumeInstallButton({ forceShow }) {
  const { appUpdated, appInstalling } = lifecycleSlice.actions;
  const dispatch = useDispatch();
  const {
    installable,
    updateAvailable,
    deferredPrompt,
    workbox,
    externalServiceWorker
  } = useSelector(selectLifecycle);
  const hidden = !installable && !updateAvailable && !forceShow;
  // TODO decide on our logic for which is more important, "install" or "update"?
  // Because the "update" message may be important for users even in the browser, not
  // just standalone, so they know to "skipWaiting" and "claimClients" and/or
  // close and reopen all app windows to get the latest version.
  // For now, we are preferencing showing the update message over the install message.
  // We also let the user override via prop.
  let showUpdateMessage = updateAvailable;

  const onClickInstall = async () => {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const userChoice = await deferredPrompt.userChoice;
    if (userChoice.outcome === 'accepted') {
      // TODO analytics to track when user installs
      dispatch(appInstalling());
    }
  };

  const onClickUpdate = () => {
    // See detailed logic handling different cases as outlined in
    // https://developers.google.com/web/tools/workbox/modules/workbox-window
    // We need to test updating both cases when an old and new service worker window are open:
    // 1) update from an old window
    // 2) update from a new window
    if (externalServiceWorker) {
      externalServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      workbox.messageSW({ type: 'SKIP_WAITING' });
    }
    dispatch(appUpdated());
  };

  return (
    <InstallOrUpdateButton
      hidden={hidden}
      showUpdateMessage={showUpdateMessage}
      onClick={e => (showUpdateMessage ? onClickUpdate() : onClickInstall())}
    />
  );
}
