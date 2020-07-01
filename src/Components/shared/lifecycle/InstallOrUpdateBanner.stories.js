import React from 'react';

import { storiesOf } from '@storybook/react';

import { makeStyles } from '@material-ui/core/styles';

import InstallOrUpdateBanner from './InstallOrUpdateBanner';
import Button from '@material-ui/core/Button';

const classes = makeStyles(theme => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  }
}));

const InstallOrUpdateBannerWithStyles = props => (
  <InstallOrUpdateBanner {...props} avatarClassName={classes().avatar} />
);

const button = <Button>Click</Button>;

storiesOf('Lifecycle/InstallOrUpdateBanner', module)
  .add('can be hidden', () => (
    <InstallOrUpdateBanner button={button} hidden={true} />
  ))
  .add('renders an install banner', () => (
    <InstallOrUpdateBanner button={button} />
  ))
  .add('renders an update banner', () => (
    <InstallOrUpdateBannerWithStyles button={button} showUpdateMessage={true} />
  ));
