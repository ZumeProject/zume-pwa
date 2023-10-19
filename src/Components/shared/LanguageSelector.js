import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const classes = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  xs: {
    '& span': {
      fontSize: '0.8em',
    },
    '& p': {
      fontSize: '0.9em',
    },
  },
  sm: {
    '& span': {
      fontSize: '1.1em',
    },
    '& p': {
      fontSize: '1.2em',
    },
  },
  md: {
    '& span': {
      fontSize: '1.4em',
    },
    '& p': {
      fontSize: '1.5em',
    },
  },
  lg: {
    '& span': {
      fontSize: '1.9em',
    },
    '& p': {
      fontSize: '2em',
    },
  },
  xl: {
    '& span': {
      fontSize: '2.2em',
    },
    '& p': {
      fontSize: '2.3em',
    },
  },
}));

export default function LanguageSelector({
  selected,
  title,
  onChange = () => {},
  languages = [
    {
      enDisplayName: 'English',
      code: 'en',
      nativeName: 'English',
    },
  ],
  className,
}) {
  if (!className) {
    className = classes();
  }

  return (
    <div className={className.root}>
      <List subheader={<ListSubheader>{title}</ListSubheader>} aria-label={title}>
        {languages.map((l) => (
          <ListItem
            button
            key={l.code}
            selected={l.code === selected}
            onClick={(e) => onChange(l.code, e)}
            className={className[l.code]}
          >
            <ListItemText
              style={{ fontSize: '10px' }}
              primary={l.nativeName}
              secondary={l.enDisplayName}
            />
          </ListItem>
        ))}
      </List>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
