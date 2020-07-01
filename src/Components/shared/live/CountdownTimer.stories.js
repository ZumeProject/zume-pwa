import React from 'react';

import { storiesOf } from '@storybook/react';
import CountdownTimer from './CountdownTimer';

storiesOf('CountdownTimer', module)
  .add('It renders with no minutes', () => <CountdownTimer />)
  .add('It renders with minutes', () => <CountdownTimer minutes={1} />);
