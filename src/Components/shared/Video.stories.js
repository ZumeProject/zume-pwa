import React from 'react';

import { storiesOf } from '@storybook/react';

import Video from './Video';

storiesOf(
  'Video',
  module
).add(
  'renders a placeholder initially that plays back the video when tapped',
  () => (
    <Video src="https://storage.googleapis.com/zume-file-mirror/en/32.mp4" />
  )
);
