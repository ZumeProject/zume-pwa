import React from 'react';
import { useSelector } from 'react-redux';
import openUrl from 'Utils/browser/openUrl';
import Description from './Description';
import InfoPart from './InfoPart';
import Button from '@material-ui/core/Button';
import Video from 'Components/shared/Video';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';
import { selectIsAssetOffline } from 'Redux/downloads';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  video: {
    width: '100%'
  }
}));

export default function WatchPart({
  t = 'WATCH',
  d,
  video,
  showScript,
  script,
  scriptLabel,
  info
}) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  const classes = useStyles();
  let videoUrl = video ? asset(video) : null;
  const isAssetOffline = useSelector(state =>
    selectIsAssetOffline(state, videoUrl)
  );
  if (!isAssetOffline) {
    // for Safari videos to work we need to skip
    // the serviceWorker because range requests aren't properly
    // handled when the video is not already available offline.
    videoUrl += '?skipServiceWorker=true';
  }

  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {info ? <InfoPart d={info} /> : null}
      {videoUrl ? <Video className={classes.video} src={videoUrl} /> : null}
      <br />
      {showScript && scriptLabel ? (
        <Button
          variant="contained"
          onClick={() => {
            openUrl(asset(script));
          }}
        >
          {trans(scriptLabel)}
        </Button>
      ) : null}
    </div>
  );
}
