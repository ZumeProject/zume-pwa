import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import currentPathAndPrefix from 'Utils/browser/currentPathAndPrefix';
import { useNavigation, useCurrentRoute } from 'react-navi';

export default function RoutedBottomNavigation({ actions, className }) {
  let navigation = useNavigation() || {};
  let { prefix, currentPath } = currentPathAndPrefix(
    navigation,
    useCurrentRoute()
  );

  let i = actions.findIndex(({ path }) => {
    if (path === '/' && prefix) {
      // NOTE 7/27/2019 Since the trailingSlash="add" option in Router is not working
      // we detect if we are at the root and have a different prefix and
      // compare the prefix with the current path. Otherwise on refresh, the root path wouldn't
      // be selected by this widget because it would compare /zume-pwa with /zume-pwa/
      return prefix === currentPath;
    }
    return prefix + path === currentPath;
  });

  const [value, setValue] = React.useState(i);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        navigation.navigate(prefix + actions[newValue].path);
      }}
      showLabels
      className={className}>
      {actions.map(a => {
        return (
          <BottomNavigationAction key={a.label} label={a.label} icon={a.icon} />
        );
      })}
    </BottomNavigation>
  );
}
