import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RoutedBottomNavigation from '../shared/navigation/RoutedBottomNavigation';
import { useTranslation } from 'react-i18next';

const classes = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
  }
});

export default function ZumeAppNavigation() {
  const { t } = useTranslation();
  const defaultActions = [
    {
      label: t('navigation|account'),
      icon: <AccountCircleOutlinedIcon />,
      path: '/menu'
    },
    {
      label: t('navigation|home'),
      icon: <HomeIcon />,
      path: '/'
    },
    {
      label: t('navigation|about'),
      icon: <InfoOutlinedIcon />,
      path: '/about'
    }
  ];

  return (
    <RoutedBottomNavigation
      actions={defaultActions}
      className={classes().stickToBottom}
    />
  );
}
