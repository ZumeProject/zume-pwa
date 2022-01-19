import React, { useState } from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
// NOTE see https://css-tricks.com/aspect-ratio-boxes/
// for how to maintain aspect ratios for video placeholders

const useStyles = makeStyles((theme) => ({
  video: {
    width: '100%',
  },
  aspectRatioBox: {
    height: 0,
    overflow: 'hidden',
    paddingTop: 'calc(591.44 / 1127.34 * 100%)',
    background: 'white',
    position: 'relative',
    border: '1px solid #ddd',
  },
  aspectRatioBoxInside: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  flexboxCentering: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
    color: theme.palette.text.secondary,
  },
}));

/**
 * Displays a placeholder that a user can tap on
 * in order to playback the actual video.
 */
export default function Video({ src, className }) {
  const [placeholder, setPlaceholder] = useState(true);
  const classes = useStyles();
  return placeholder ? (
    <div
      className={className + ' media'}
      onClick={() => {
        setPlaceholder(false);
      }}
    >
      <div className={classes.aspectRatioBox}>
        <div className={classes.aspectRatioBoxInside}>
          <div className={classes.flexboxCentering}>
            <PlayCircleFilledIcon fontSize="inherit" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <video className={clsx(className, classes.video)} src={src} controls autoPlay></video>
  );
}
