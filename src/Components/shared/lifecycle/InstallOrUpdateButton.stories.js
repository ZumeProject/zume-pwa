import React from 'react';

import { storiesOf } from '@storybook/react';

import { makeStyles } from '@material-ui/core/styles';

import InstallOrUpdateButton from './InstallOrUpdateButton';
import { action } from '@storybook/addon-actions';

const classes = makeStyles(theme => ({
  button: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  }
}));

const InstallOrUpdateButtonWithStyles = props => (
  <InstallOrUpdateButton {...props} className={classes().button} />
);

storiesOf('Lifecycle/InstallOrUpdateButton', module)
  .add('can be hidden', () => (
    <InstallOrUpdateButton onClick={action('clicked')} hidden={true} />
  ))
  .add('renders an install button', () => (
    <InstallOrUpdateButton onClick={action('clicked')} />
  ))
  .add('renders an update button', () => (
    <InstallOrUpdateButtonWithStyles
      onClick={action('clicked')}
      showUpdateMessage={true}
    />
  ));
