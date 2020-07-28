import React from 'react';
import BannerWithAvatar from '../BannerWithAvatar';
import Avatar from '@material-ui/core/Avatar';

import { useAppTranslation } from 'Components/zume/translationHooks';
import { isSafariIOS } from 'Utils/browser/userAgent';
import AddToHomeScreenOutlined from '@material-ui/icons/AddToHomeScreenOutlined';
import SystemUpdateOutlined from '@material-ui/icons/SystemUpdateOutlined';
import IOSShareIcon from 'Components/shared/IOSShareIcon';

export default function InstallOrUpdateBanner({
  hidden,
  showUpdateMessage,
  avatarClassName,
  button,
  ...props
}) {
  const trans = useAppTranslation();
  let icon = null;
  let message = '';
  if (showUpdateMessage) {
    icon = <SystemUpdateOutlined />;
    message = trans('A new version of this app is available. Click to update this app.');
  } else {
    if (isSafariIOS()) {
      icon = <IOSShareIcon />;
      message = trans("Tap on Safari's share icon and tap 'Add to Home Screen' to install this app.");
      avatarClassName = '';
    } else {
      icon = <AddToHomeScreenOutlined />;
      message = trans('This app can be installed to your device. Click to install this app.');
    }
  }

  const avatar = <Avatar className={avatarClassName}>{icon}</Avatar>;
  return hidden ? null : (
    <BannerWithAvatar message={message} avatar={avatar} buttons={[button]} />
  );
}
