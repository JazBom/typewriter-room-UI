import { createMuiTheme }  from '@material-ui/core/styles';

export const theme = createMuiTheme({  
  root: {
    flexGrow: 1,
  },
  spacing: '2%',
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
