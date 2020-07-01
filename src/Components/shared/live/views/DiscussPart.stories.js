import React from 'react';
import { storiesOf } from '@storybook/react';
import DiscussPart from './DiscussPart';

storiesOf('Live Views.DiscussPart', module)
  .add('renders with no content', () => <DiscussPart />)
  .add('renders with title', () => <DiscussPart t="Hi" />)
  .add('renders with title and description', () => (
    <DiscussPart t="Important question" d="What did you eat for dinner?" />
  ))
  .add('renders with a single question', () => (
    <DiscussPart questions={['solo question']} />
  ))
  .add('renders with title and questions', () => (
    <DiscussPart
      t="Important questions"
      questions={[
        'Is this a test?',
        'How many questions do you see?',
        'And when will you be done?'
      ]}
    />
  ))
  .add('renders with an info part', () => (
    <DiscussPart
      questions={['my first question']}
      info={'This is an infobox'}
    />
  ));
