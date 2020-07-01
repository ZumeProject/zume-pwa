import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const classes = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function LanguageSelector({
  selected,
  title,
  onChange = () => {},
  languages = [
    {
      enDisplayName: 'English',
      code: 'en',
      nativeName: 'English'
    }
  ],
  className
}) {
  if (!className) {
    className = classes().root;
  }

  return (
    <div className={className}>
      <List
        subheader={<ListSubheader>{title}</ListSubheader>}
        aria-label={title}
      >
        {languages.map(l => (
          <ListItem
            button
            key={l.code}
            selected={l.code === selected}
            onClick={e => onChange(l.code, e)}
          >
            <ListItemText primary={l.nativeName} secondary={l.enDisplayName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
