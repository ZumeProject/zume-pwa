import React from 'react';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    bottom: theme.spacing(11),
    left: '50%'
  },
  fab: {
    margin: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    left: '-50%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function ZoomInFAB(props) {
  const classes = useStyles();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const Icon = props.icon;
  const onClick = props.onClick;
  const label = props.label;

  return (
    <Zoom
      in={true}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`
      }}
      unmountOnExit
    >
      <div className={classes.wrapper}>
        <Fab
          variant="extended"
          aria-label={label}
          className={classes.fab}
          onClick={onClick}
        >
          {Icon ? <Icon className={classes.extendedIcon} /> : null}
          {props.children}
        </Fab>
      </div>
    </Zoom>
  );
}
