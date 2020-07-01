import React from 'react';

import { storiesOf } from '@storybook/react';

import BannerWithAvatar from './BannerWithAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddToHomeScreenOutlined from '@material-ui/icons/AddToHomeScreenOutlined';
import { action } from '@storybook/addon-actions';

storiesOf('BannerWithAvatar', module)
  .add('renders a banner with an avatar, message and button', () => (
    <BannerWithAvatar
      avatar={
        <Avatar>
          <AddToHomeScreenOutlined />
        </Avatar>
      }
      message="A sample message"
      buttons={[<Button onClick={action('clicked')}>Click</Button>]}
    />
  ))
  .add('renders with multiple buttons', () => (
    <BannerWithAvatar
      avatar={
        <Avatar>
          <AddToHomeScreenOutlined />
        </Avatar>
      }
      message="A sample message"
      buttons={[
        <Button onClick={action('clicked')}>Click 1</Button>,
        <Button onClick={action('clicked')}>Click 2</Button>
      ]}
    />
  ));
