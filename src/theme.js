import { createMuiTheme }  from '@material-ui/core/styles';

export const theme = createMuiTheme({  
  root: {
    display: 'flex',
    flexDirection: 'colummn',
    flexGrow: 1,
    margin: '0, auto'
  },
  spacing: 1,
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
