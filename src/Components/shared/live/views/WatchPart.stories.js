import React from 'react';
import { storiesOf } from '@storybook/react';
import WatchPart from './WatchPart';

storiesOf('Live Views.WatchPart', module)
  .add('renders with no content', () => <WatchPart />)
  .add('renders with title', () => <WatchPart t="Hi" />)
  .add('renders with description', () => (
    <WatchPart d="A video you can watch." />
  ))
  .add('renders with description and scriptLabel', () => (
    <WatchPart
      d="You will watch a video and discuss it."
      scriptLabel="Download the script"
    />
  ))
  .add('renders with a video', () => (
    <WatchPart
      t="A video"
      d="This is a sample video"
      script="scriptkey"
      scriptLabel="Download video script"
      video="videoUrlKey"
    />
  ))
  .add('renders with a video and download script button', () => (
    <WatchPart
      t="A video"
      d="This is a sample video"
      showScript={true}
      script="scriptkey"
      scriptLabel="Download video script"
      video="videoUrlKey"
    />
  ))
  .add('renders with an info part', () => <WatchPart info="This is info" />);
