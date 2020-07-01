import React from 'react';
import BannerWithAvatar from '../BannerWithAvatar';
import Avatar from '@material-ui/core/Avatar';

import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  let icon = null;
  let message = '';
  if (showUpdateMessage) {
    icon = <SystemUpdateOutlined />;
    message = t('install|update_explanation');
  } else {
    if (isSafariIOS()) {
      icon = <IOSShareIcon />;
      message = t('install|ios_install_explanation');
      avatarClassName = '';
    } else {
      icon = <AddToHomeScreenOutlined />;
      message = t('install|install_explanation');
    }
  }

  const avatar = <Avatar className={avatarClassName}>{icon}</Avatar>;
  return hidden ? null : (
    <BannerWithAvatar message={message} avatar={avatar} buttons={[button]} />
  );
}
