import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  banner: {
    left: '5%',
    right: '5%',
    height: 'auto',
    fontSize: 'MIN(1.2rem, 18px)',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 3vw',
    bottom: 57,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '5px',
    background: theme.palette.info.contrastText, //'#DDFFFF'
    color: theme.palette.text.primary,
    zIndex: 999,
    '& p': {
      margin: '0 5px',
    },
    '& button': {
      background: theme.palette.secondary.main,
      color: 'white',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '3px',
      padding: '5px',
      cursor: 'pointer',
    },
  },
}));

const ZumeResumeBanner = ({ displayText, buttonText, onClick, ...props }) => {
  const classes = useStyles();
  const text = displayText || 'A lesson has already been started. Continue where you left off?';
  const textInButton = buttonText || 'Continue';
  return (
    <div className={classes.banner}>
      <p>{text}</p>
      <button onClick={onClick}>{textInButton}</button>
    </div>
  );
};

export default ZumeResumeBanner;
