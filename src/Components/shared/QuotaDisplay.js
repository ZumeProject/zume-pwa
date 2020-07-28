import React from 'react';
import { PROMPT } from 'Redux/downloads/storage';
import { useAppTranslation } from 'Components/zume/translationHooks';

/**
 * Displays a progress bar of the user's storage quota
 * when the storage API is available
 */
export default function QuotaDisplay({ data, persistButton }) {
  if (!data) {
    data = {};
  }
  const { quota, usage, persisted } = data;
  const trans = useAppTranslation();
  let label = ''; //'Storage usage not available';
  let percent = 0;
  if (quota) {
    label = `${trans('Storage')}: ${(usage / 1e6).toFixed(0)} / ${(quota / 1e6).toFixed(
      0
    )} mb`;
    percent = (usage / quota) * 100;
  }

  return quota ? (
    <div>
      {persisted === PROMPT ? persistButton : null}
      <div id="storage-box">{label}</div>
      <progress max="100" value={percent} title={label} />
    </div>
  ) : (
    <div>{label}</div>
  );
}
