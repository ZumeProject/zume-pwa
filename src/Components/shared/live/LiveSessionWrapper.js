import React from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'Redux/language';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ShareIcon from '@material-ui/icons/Share';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
}));

// NOTE order matters, virtualize must come first.
// https://react-swipeable-views.com/getting-started/usage/#example-with-virtualize
const EnhancedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

export default function LiveSessionWrapper({
                                             slideRenderer,
                                             slideCount,
                                             index,
                                             onChangeIndex,
                                             centerNavElement,
                                             onExit,
                                           }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { rtl } = useSelector(selectLanguage);

  return (
      <Container className={classes.main} maxWidth={false}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label={t('live|share')}>
              <ShareIcon />
            </IconButton>
            <div className={classes.grow}>{centerNavElement}</div>
            <IconButton
                edge="end"
                color="inherit"
                aria-label={t('live|exit')}
                onClick={onExit}
            >
              <FullscreenExitIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <EnhancedSwipeableViews
            index={index}
            onChangeIndex={onChangeIndex}
            slideRenderer={slideRenderer}
            slideCount={slideCount}
            enableMouseEvents
            axis={rtl ? 'x-reverse' : 'x'}
        />
        <AppBar
            position="fixed"
            elevation={0}
            color="primary"
            className={classes.bottomBar}
        >
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label={t('live|previous')}
                onClick={() => onChangeIndex(index - 1)}
            >
              {rtl ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
            </IconButton>
            <div className={classes.grow} />
            <IconButton
                edge="end"
                color="inherit"
                aria-label={t('live|next')}
                onClick={() => onChangeIndex(index + 1)}
            >
              {rtl ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
  );
}
