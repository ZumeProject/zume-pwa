import React from 'react';
import { storiesOf } from '@storybook/react';
import ReadPart from './ReadPart';

const sampleDescription = [
  {
    t: 'Accountability Groups',
    d:
      'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think. Accountability Groups are a great way to get ready!'
  }
];

storiesOf('Live Views.ReadPart', module)
  .add('renders with no content', () => <ReadPart />)
  .add('renders with title', () => <ReadPart t="Hi" />)
  .add('renders with a description', () => (
    <ReadPart d="A long description should appear here." />
  ))
  .add('renders with a description and info', () => (
    <ReadPart
      d={sampleDescription}
      info={
        'Find the "Accountability Groups" section in your Zúme Guidebook, and listen to the audio below.'
      }
    />
  ));
