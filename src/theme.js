import { createMuiTheme }  from '@material-ui/core/styles';

export const theme = createMuiTheme({  
  root: {
    // display: 'fixed',
    // flexDirection: 'row',
    flexGrow: 1,
    // margin: '0, auto'
  },
  spacing: 2.5,
  palette: {
    type: 'light',
    primary: {
      main: '#00acc1',
      contrastText: '#1a0802',
    },
    secondary: {
      main: '#009688',
    },
    background: {
      default: '#F7F4F3',
    },
  },
  typography: {
    h3: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
      fontSize: '1.5rem',
      fontFamily: 'Open Sans',
    },
  },
});
