import React from 'react';

import { storiesOf } from '@storybook/react';

import EditableTable from './EditableTable';

storiesOf('Form/EditableTable', module).add('renders an editable table', () => (
  <EditableTable
    data={[
      { name: 'Mehmet', status: 'disciple' },
      { name: 'Zerya', status: 'unknown' }
    ]}
    columns={[
      { title: 'Name', field: 'name' },
      {
        title: 'Status',
        field: 'status',
        initialEditValue: 'unknown',
        lookup: {
          disciple: 'Disciple',
          unbeliever: 'Unbeliever',
          unknown: 'Unknown'
        }
      }
    ]}
  />
));
