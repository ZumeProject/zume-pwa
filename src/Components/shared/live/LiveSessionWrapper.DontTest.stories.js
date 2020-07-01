import React from 'react';

import { storiesOf } from '@storybook/react';
import LiveSessionWrapper from './LiveSessionWrapper';

const slideRenderer = ({ key, index }) => (
  <div key={key}>{`slide ${index + 1}`}</div>
);

storiesOf('LiveSessionWrapper.DontTest', module)
  .add('renders with no session data', () => (
    <LiveSessionWrapper slideRenderer={slideRenderer} />
  ))
  .add('renders with a selected session', () => (
    <LiveSessionWrapper sessionId={1} slideRenderer={slideRenderer} />
  ))
  .add('renders with a center nav element', () => (
    <LiveSessionWrapper
      sessionId={2}
      slideRenderer={slideRenderer}
      centerNavElement={<div style={{ textAlign: 'center' }}>Yes</div>}
    />
  ));
