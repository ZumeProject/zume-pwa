import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from './Section';

storiesOf('Live Views.Section', module)
  .add('renders with no content', () => <Section />)
  .add('renders with title', () => <Section t="Hi" />)
  .add('renders with title and description', () => (
    <Section t="Hi" d="A long description should appear here." />
  ))
  .add('renders with title, description and info', () => (
    <Section
      t="Watch and Discuss"
      d="You will watch a video and discuss it."
      info="Remember to ask the questions!"
    />
  ))
  .add('renders with a multiline description', () => (
    <Section d={['line 1', 'line 2']} />
  ));
