import React from 'react';
import { useNavigation } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';

const filename = '/zume-logo-white.png';
const favicon = '/favicon.png';

// TODO pull these from material-ui's button size styles
const useStyles = makeStyles(theme => ({
  favicon: {
    height: '32px'
  },
  small: {
    height: '30px'
  },
  medium: {
    height: '36px'
  },
  large: {
    height: '42px'
  }
}));

export default function ZumeLogo(props) {
  const classes = useStyles();
  const navigation = useNavigation();
  let src = '';
  if (props.size === 'favicon') {
    src = favicon;
  } else {
    src = filename;
  }
  if (navigation && navigation.basename) {
    src = `${navigation.basename}${src}`;
  }
  return (
    <img
      src={src}
      alt="Zume logo"
      className={classes[props.size || 'medium']}
    />
  );
}
