import React from "react";
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';

const LogInOrRegister = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid
    container
    display="flex"
    direction="column"
    justify="space-evenly"
    alignItems="center"
    margin={classes.root}
    spacing={0}
  >
  
  <Grid item xs={12} sm={12} lg={12}>
  <form className="register">
    <h2>New to the Typewriter Room?</h2>
    <Grid>
    <Button variant="contained" color="primary" size="small">Register</Button>
    </Grid>
    <Grid>
    <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    <TextField
          label="Password"
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    </Grid>
    
    </form>  
  </Grid>
  
  <Grid item xs={12} sm={12} lg={12} >
    <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
  </Grid>
  
  <Grid item xs={12} sm={12} lg={12}>
  <form className="login">
    <Grid>
    <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    <TextField
          label="Password"
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    </Grid>
    <Grid>
    <Button variant="contained" color="primary" size="small">Log-in</Button>
    </Grid>
    <h2>Get typing...</h2>

    </form>  
  </Grid>
  
</Grid>

    
  );
};

export { LogInOrRegister };