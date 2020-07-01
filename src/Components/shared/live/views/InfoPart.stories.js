import React from 'react';
import { storiesOf } from '@storybook/react';
import InfoPart from './InfoPart';

storiesOf('Live Views.InfoPart', module)
  .add('renders with no content', () => <InfoPart />)
  .add('renders with content', () => (
    <InfoPart
      d={
        'Find the "S.O.A.P.S. Bible Reading" section in your Zúme Guidebook and listen to the audio overview.'
      }
    />
  ));
