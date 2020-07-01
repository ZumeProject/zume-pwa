import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';
import useBasenameUrl from 'Utils/browser/useBasenameUrl';

// https://material-ui.com/components/grid-list/
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: 'white'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function GroupGridList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GroupGridListItem key={tile.img} tile={tile} />
        ))}
      </GridList>
    </div>
  );
}

function GroupGridListItem({ tile }) {
  const classes = useStyles();
  return (
    <GridListTile>
      <img
        src={useBasenameUrl(tile.img)}
        alt={tile.title}
        style={{ width: '200px', height: '200px' }}
      />
      <GridListTileBar
        title={tile.title}
        color="white"
        classes={{
          root: classes.titleBar,
          title: classes.title
        }}
      />
    </GridListTile>
  );
}
