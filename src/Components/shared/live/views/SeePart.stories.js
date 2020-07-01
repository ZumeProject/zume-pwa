import React from 'react';
import { storiesOf } from '@storybook/react';
import SeePart from './SeePart';

const sampleDescription = [
  {
    t: 'Accountability Groups',
    d:
      'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think. Accountability Groups are a great way to get ready!'
  }
];

storiesOf('Live Views.SeePart', module)
  .add('renders with no content', () => <SeePart />)
  .add('renders with title', () => <SeePart t="Hi" />)
  .add('renders with a description', () => (
    <SeePart d="A long description should appear here." />
  ))
  .add('renders with a description and image', () => (
    <SeePart d={sampleDescription} payload={{ image: 'exampleUrl' }} />
  ));
