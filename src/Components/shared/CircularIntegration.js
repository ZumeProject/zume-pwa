import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  iconButtonProgress: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1
  }
}));

export default function CircularIntegration({
  variant,
  value,
  loading,
  iconButton,
  onClick
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {iconButton}
      {loading && (
        <CircularProgress
          variant={variant}
          value={value}
          size={32}
          className={classes.iconButtonProgress}
          onClick={onClick}
        />
      )}
    </div>
  );
}
