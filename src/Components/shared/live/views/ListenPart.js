import React from 'react';
import { useSelector } from 'react-redux';
import openUrl from 'Utils/browser/openUrl';
import Description from './Description';
import Button from '@material-ui/core/Button';
import Video from 'Components/shared/Video';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';
import { selectIsAssetOffline } from 'Redux/downloads';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  audio: {
    width: '100%'
  }
}));

export default function ListenPart({
  t = 'LISTEN',
  d,
  audio,
  script,
  scriptLabel,
  text // TODO replace script and scriptLabel with just text (but call it script)
}) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  const classes = useStyles();
  let audioUrl = audio ? asset(audio) : null;
  const isAssetOffline = useSelector(state =>
    selectIsAssetOffline(state, audioUrl)
  );
  if (!isAssetOffline) {
    // for Safari audio/video to work we need to skip
    // the serviceWorker because range requests aren't properly
    // handled when the video is not already available offline.
    audioUrl += '?skipServiceWorker=true';
  }

  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {/* NOTE for now this is still a video because we aren't storing mp3s yet */}
      {audioUrl ? (
        <Video className={classes.audio} src={audioUrl} controls />
      ) : null}
      <br />
      {scriptLabel ? (
        <Button
          variant="contained"
          onClick={() => {
            openUrl(asset(script));
          }}
        >
          {trans(scriptLabel)}
        </Button>
      ) : null}
      {text ? <Description d={text} /> : null}
    </div>
  );
}
