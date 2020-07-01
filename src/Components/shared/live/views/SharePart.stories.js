import React from 'react';
import { storiesOf } from '@storybook/react';
import SharePart from './SharePart';

storiesOf('Live Views.SharePart', module)
  .add('renders with no content', () => <SharePart />)
  .add('renders with title', () => <SharePart t="Hi" />)
  .add('renders with description', () => <SharePart d="Share me!" />)
  .add('renders with a payload', () => (
    <SharePart payload={{ key: 'key', label: 'Download' }} />
  ));
