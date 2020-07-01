import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { useNavigation } from 'react-navi';
import useBasenameUrl from 'Utils/browser/useBasenameUrl';
import { useAppTranslation } from 'Components/zume/translationHooks';
import Zoom from '@material-ui/core/Zoom';

// https://material-ui.com/components/grid-list/
const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListWrapped: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  tile: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      width: '6rem',
      height: '6rem',
    },
    [theme.breakpoints.up('md')]: {
      width: '8rem',
      height: '8rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '11rem',
      height: '11rem',
    },
    margin: '5px',
  },
  unselectedTile: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function SessionGridList({
  sessions,
  selectedId,
  variant,
  animate,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));
  const tileRef = React.createRef();
  useEffect(() => {
    if (tileRef.current) {
      tileRef.current.scrollIntoView();
    }
  }, [tileRef, sessions, selectedId]);

  if (!sessions || !sessions.length) {
    return <div className={classes.root}>No sessions available</div>;
  }
  const cols = mdMatch ? 4.25 : 4;
  const wrapped = variant === 'wrapped';

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const gridList = (
    <GridList
      className={wrapped ? classes.gridListWrapped : classes.gridList}
      cellHeight="auto"
      cols={cols}>
      {sessions.map((s) => {
        let tileClass = classes.tile;
        if (s.id !== selectedId) {
          tileClass = clsx(classes.tile, classes.unselectedTile);
        }
        if (!selectedId || s.id !== selectedId) {
          return <SessionGridListItem key={s.id} s={s} className={tileClass} />;
        } else {
          return (
            <SessionGridListItem
              key={s.id}
              s={s}
              className={tileClass}
              ref={tileRef}
            />
          );
        }
      })}
    </GridList>
  );
  if (animate) {
    return (
      <Zoom
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit>
        {gridList}
      </Zoom>
    );
  } else {
    return gridList;
  }
}

const SessionGridListItem = React.forwardRef(({ key, s, className }, ref) => {
  const href = useBasenameUrl(`/session/${s.id}`);
  const t = useAppTranslation();
  const navigation = useNavigation();
  return (
    <GridListTile key={key}>
      <Box
        ref={ref}
        onClick={() => {
          navigation.navigate(href);
        }}
        boxShadow={1}
        textAlign="center"
        className={className}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {t(s.title)}
      </Box>
    </GridListTile>
  );
});
