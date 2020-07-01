import React from 'react';

import { storiesOf } from '@storybook/react';
import SessionDownloadList from './SessionDownloadList';
import { action } from '@storybook/addon-actions';

const pseudorandomNumbers = [
  0.14669197621422847,
  0.4725781218304679,
  0.7441966150557602,
  0.1389306382588058,
  0.4211596192356746,
  0.2566943095617402,
  0.6595692256457466,
  0.3836504205676614,
  0.6660639119870331,
  0.8477243833170198
];
let pseudocounter = 0;
function pseudorandom() {
  if (pseudocounter > pseudorandomNumbers.length - 1) {
    pseudocounter = 0;
  }
  return pseudorandomNumbers[pseudocounter++];
}

const high = 9704743;
const low = 39677;
const sessionsWithSizes = Array.from(new Array(10)).map((_, i) => ({
  id: i + 1,
  t: `Session ${i + 1}`,
  size: Math.floor(pseudorandom() * (high - low) + low),
  offlineAccess: Math.floor(pseudorandom() * 10) % 2 === 0
}));

storiesOf('Session/SessionDownloadList', module)
  .add('renders with no session data', () => <SessionDownloadList />)
  .add('renders with sessions', () => (
    <SessionDownloadList
      sessionsWithSizes={sessionsWithSizes}
      onDownload={action('Download')}
      onDelete={action('Delete')}
    />
  ))
  .add('renders with download initiated, but no progress', () => {
    //TODO
    return <SessionDownloadList />;
  })
  .add('renders with download progressed', () => {
    //TODO
    return <SessionDownloadList />;
  })
  .add('renders with download near completion', () => {
    //TODO
    return <SessionDownloadList />;
  })
  .add('renders with download completed', () => {
    //TODO
    return <SessionDownloadList />;
  });
