import React from 'react';
import Button from '@material-ui/core/Button';
import AddToHomeScreenOutlined from '@material-ui/icons/AddToHomeScreenOutlined';
import SystemUpdateOutlined from '@material-ui/icons/SystemUpdateOutlined';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  let icon = null;
  let text = '';
  let label = '';
  let onClick = props.onClick;
  if (showUpdateMessage) {
    icon = <SystemUpdateOutlined />;
    text = t('install|update');
    label = t('install|update_explanation');
  } else {
    icon = <AddToHomeScreenOutlined />;
    if (isSafariIOS()) {
      text = t('install|ios_learn_more');
      label = t('install|ios_install_explanation');
      onClick = e => {
        window.open(iOSaddToHomeInstructionsUrl);
      };
    } else {
      text = t('install|install');
      label = t('install|install_explanation');
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
