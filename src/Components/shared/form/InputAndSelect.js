import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    background: theme.palette.background.default
  }
}));

export default function InputAndSelect({
  inputProps = {},
  selectProps = {},
  onChange,
  component
}) {
  const classes = useStyles();
  const Component = component || React.Fragment;
  return (
    <Component>
      <FormControl className={classes.formControl}>
        <TextField
          label={inputProps.label}
          InputLabelProps={{
            shrink: true
          }}
          variant="filled"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          select
          label={selectProps.label}
          value={selectProps.defaultValue}
          onChange={onChange}
          variant="filled">
          {selectProps.options.map((o, i) => (
            <MenuItem key={`mi-${i}`} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Component>
  );
}
