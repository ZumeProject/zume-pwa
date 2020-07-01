import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#2CACE2',
        contrastText: '#fff' // accessibility warning for white on the shade of blue we use
      },
      secondary: {
        main: '#233469'
      },
      error: {
        main: red.A400
      },
      background: {
        default: '#fff'
      }
    }
  })
);

theme.typography.body1 = {
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem'
  }
};

theme.typography.body2 = {
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.75rem'
  }
};

theme.typography.caption = {
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem'
  }
};

export default theme;
