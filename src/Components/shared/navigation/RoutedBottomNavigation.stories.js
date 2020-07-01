import React from 'react';

import { storiesOf } from '@storybook/react';

import { makeStyles } from '@material-ui/core/styles';

import RoutedBottomNavigation from './RoutedBottomNavigation';
import Cancel from '@material-ui/icons/Cancel';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import CancelTwoTone from '@material-ui/icons/CancelTwoTone';

const testActions = [
  {
    label: 'Hello',
    icon: <Cancel />,
    path: '/#1'
  },
  {
    label: 'World',
    icon: <CancelOutlined />,
    path: '/#2'
  },
  {
    label: 'Test',
    icon: <CancelTwoTone />,
    path: '/#3'
  }
];

const classes = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
  }
});

function RoutedBottomNavigationWithStyles({ actions }) {
  return (
    <RoutedBottomNavigation
      actions={actions}
      className={classes().stickToBottom}
    />
  );
}

storiesOf('RoutedBottomNavigation', module)
  .add('renders with actions', () => (
    <RoutedBottomNavigation actions={testActions} />
  ))
  .add('with class styles', () => (
    <RoutedBottomNavigationWithStyles actions={testActions} />
  ));
