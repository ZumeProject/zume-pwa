import React from 'react';

import { storiesOf } from '@storybook/react';

import InputAndSelect from './InputAndSelect';
export const inputProps = { label: 'Name' };
export const selectProps = {
  label: 'Status',
  defaultValue: 'unknown',
  options: [
    {
      value: 'disciple',
      label: 'Disciple'
    },
    {
      value: 'unbeliever',
      label: 'Unbeliever'
    },
    {
      value: 'unknown',
      label: 'Unknown'
    }
  ]
};
storiesOf('Form/InputAndSelect', module)
  .add('renders an input and select', () => (
    <InputAndSelect inputProps={inputProps} selectProps={selectProps} />
  ))
  .add('renders multiple inputs and selects', () => {
    const keys = [...Array(10).keys()];
    return (
      <ol>
        {keys.map(k => (
          <li key={`li-${k}`}>
            <InputAndSelect inputProps={inputProps} selectProps={selectProps} />
          </li>
        ))}
      </ol>
    );
  });
