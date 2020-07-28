import React from 'react';
import Button from '@material-ui/core/Button';
import AddToHomeScreenOutlined from '@material-ui/icons/AddToHomeScreenOutlined';
import SystemUpdateOutlined from '@material-ui/icons/SystemUpdateOutlined';
import { useAppTranslation } from 'Components/zume/translationHooks';
import { makeStyles } from '@material-ui/core/styles';
import { isSafariIOS } from 'Utils/browser/userAgent';
import clsx from 'clsx';

const classes = makeStyles(theme => ({
  show: {
    display: 'inline-flex'
  },
  hide: {
    display: 'none'
  }
}));

const iOSaddToHomeInstructionsUrl =
  'https://support.apple.com/guide/shortcuts/run-shortcuts-from-the-ios-home-screen-apd735880972/ios';

export default function InstallOrUpdateButton({
  hidden,
  showUpdateMessage,
  ...props
}) {
  const trans = useAppTranslation();
  let icon = null;
  let text = '';
  let label = '';
  let onClick = props.onClick;
  if (showUpdateMessage) {
    icon = <SystemUpdateOutlined />;
    text = trans('Update');
    label = trans('A new version of this app is available. Click to update this app.');
  } else {
    icon = <AddToHomeScreenOutlined />;
    if (isSafariIOS()) {
      text = trans('Learn more');
      label = trans("Tap on Safari's share icon and tap 'Add to Home Screen' to install this app.");
      onClick = e => {
        window.open(iOSaddToHomeInstructionsUrl);
      };
    } else {
      text = trans('Install');
      label = trans('This app can be installed to your device. Click to install this app.');
    }
  }

  const displayStyle = hidden ? classes().hide : classes().display;

  return (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      className={clsx(props.className, displayStyle)}
      aria-label={label}
      title={label}
      onClick={onClick}>
      {icon}
      &nbsp; {text}
    </Button>
  );
}
