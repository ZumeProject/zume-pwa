import React from 'react';
import { storiesOf } from '@storybook/react';
import FormPart from './FormPart';

storiesOf('Live Views.FormPart.DontTest', module)
  .add('renders with no content', () => (
    <FormPart payload={{ name: 'fake-form' }} />
  ))
  .add('renders with title', () => (
    <FormPart t="Hi" payload={{ name: 'fake-form' }} />
  ))
  .add('renders with title and description', () => (
    <FormPart
      payload={{ name: 'fake-form' }}
      t="Important question"
      d="What did you eat for dinner?"
    />
  ))
  .add('renders with title and parts with data', () => (
    <FormPart
      t="List of 100"
      parts={[
        {
          type: 'EditableTable',
          payload: {
            title: 'List of 100',
            columns: [
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
            ]
          }
        }
      ]}
      payload={{
        name: 'list-of-100'
      }}
    />
  ));
