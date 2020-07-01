import React from 'react';
import Button from '@material-ui/core/Button';
import { NEVER, PROMPT } from 'Redux/downloads/storage';

import { storiesOf } from '@storybook/react';

import QuotaDisplay from './QuotaDisplay';

const persistButton = <Button>Tap to persist</Button>;

storiesOf('QuotaDisplay', module)
  .add('renders a quota error message when no data is available', () => (
    <QuotaDisplay />
  ))
  .add(
    'renders a quota usage estimate in megabytes and with progress bar when data is given',
    () => <QuotaDisplay data={{ quota: 102641103, usage: 16464983 }} />
  )
  .add('renders a quota estimate without a persist option', () => (
    <QuotaDisplay
      data={{
        quota: 102641103,
        usage: 16464983,
        persisted: NEVER
      }}
      persistButton={persistButton}
    />
  ))
  .add('renders a quota estimate with a persist option', () => (
    <QuotaDisplay
      data={{
        quota: 102641103,
        usage: 16464983,
        persisted: PROMPT
      }}
      persistButton={persistButton}
    />
  ));
