import React from 'react';

import { storiesOf } from '@storybook/react';
import SessionGridList from './SessionGridList';

const sessions = Array.from(new Array(10)).map((_, i) => ({
  id: i + 1,
  title: 'Session',
}));

storiesOf('Session/SessionGridList', module)
  .add('renders with no session data', () => <SessionGridList />)
  .add('renders with sessions', () => <SessionGridList sessions={sessions} />)
  .add('renders with a selected session', () => (
    <SessionGridList sessions={sessions} selectedId={2} />
  ))
  .add('renders in a wrapped mode', () => (
    <SessionGridList sessions={sessions} variant="wrapped" />
  ));

storiesOf('Session/SessionGridList.DontTest', module).add(
  'DontTest.animate',
  () => <SessionGridList sessions={sessions} animate={true} />
);
