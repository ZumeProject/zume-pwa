import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-navi';
import useBasenameUrl from 'Utils/browser/useBasenameUrl';

export default function ListItemLink(props) {
  return (
    <ListItem
      button
      component={Link}
      {...props}
      href={useBasenameUrl(props.href)}
    />
  );
}
