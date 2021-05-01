import { createMuiTheme }  from '@material-ui/core/styles';

export const theme = createMuiTheme({  
  root: {
    flexGrow: 3,
  },
  spacing: 10,
  palette: {
        type: 'light',
        primary: {
          main: '#7e3fb5',
        },
        secondary: {
          main: '#f50057',
        },
      
    },
});
