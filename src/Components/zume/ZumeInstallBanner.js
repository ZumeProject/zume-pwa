import React from 'react';
import { selectLifecycle } from 'Redux/lifecycle';
import { useSelector } from 'react-redux';
import InstallOrUpdateBanner from '../shared/lifecycle/InstallOrUpdateBanner';
import ZumeInstallButton from './ZumeInstallButton';
import { makeStyles } from '@material-ui/core/styles';
import { isSafariIOS } from 'Utils/browser/userAgent';

const useStyles = makeStyles(theme => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
}));

export default function ZumeInstallBanner() {
  const classes = useStyles();
  const { installable, updateAvailable, firstVisit } = useSelector(
    selectLifecycle
  );

  const iOSFirstVisit = firstVisit && isSafariIOS();
  let hidden = !installable && !updateAvailable && !iOSFirstVisit;
  let showUpdateMessage = updateAvailable;

  return (
    <InstallOrUpdateBanner
      hidden={hidden}
      showUpdateMessage={showUpdateMessage}
      avatarClassName={classes.avatar}
      button={<ZumeInstallButton />}
    />
  );
}
