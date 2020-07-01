import React from 'react';
import { storiesOf } from '@storybook/react';
import BasicPart from './BasicPart';

storiesOf('Live Views.BasicPart', module)
  .add('renders with no content', () => <BasicPart />)
  .add('renders with title', () => <BasicPart t="Hi" />)
  .add('renders with title and description', () => (
    <BasicPart t="Hi" d="A long description should appear here." />
  ))
  .add('renders with title, description and info', () => (
    <BasicPart
      t="Watch and Discuss"
      d="You will watch a video and discuss it."
      info="Remember to ask the questions!"
    />
  ))
  .add('renders with a cta', () => (
    <BasicPart payload={{ label: 'DOWNLOAD', key: 'downloadKey' }} />
  ));
