import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';
import { logIn } from '../api/capstone-server';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(10),
      width: 200,
    },
  },
}));

const LogInOrRegister = (props) => {

  
  const classes = useStyles();

  const history = useHistory();

    const [registerForm, setRegisterForm] = useState({
      name: '',
      password: ''
      })
  
    const [logInForm, setLogInForm] = useState({
        name: '',
        password: ''
      })

    const changeHandlerRegister = (e) => {
        const newRegisterFormState = {...registerForm};
        newRegisterFormState[e.target.name] = e.target.value;
        console.log(newRegisterFormState);
        setRegisterForm(newRegisterFormState);
    }

    const changeHandlerLogIn = (e) => {
      const newLogInFormState = {...logInForm};
      newLogInFormState[e.target.name] = e.target.value;
      console.log(newLogInFormState);
      setLogInForm(newLogInFormState);
  }

    const logInHandler = (e) => {
        e.preventDefault();
        logIn(logInForm)
        .then((response) => {
            if(response.token) {
                history.replace('/home');
            }
        })
    }

  return (
    <Grid
    container
    className={classes.root}
    // spacing={props.theme.spacing(20)}
  >
  
  <Grid className={classes.root}>
  <form className="register">
    <h2>New to the Typewriter Room?</h2>
    <Grid>
    <Button variant="contained" color="primary" size="small">Register</Button>
    </Grid>
    <Grid>
    <TextField
          label="Name"
          name="name"
          onChange={changeHandlerRegister}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    <TextField
          label="Password"
          name="password"
          type="password"
          onChange={changeHandlerRegister}
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
  <form className="login" onSubmit={logInHandler}>
    <Grid>
    <TextField
          label="Name"
          name="name"
          onChange={changeHandlerLogIn}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    <TextField
          label="Password"
          name="password"
          type="password"
          onChange={changeHandlerLogIn}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    </Grid>
    <Grid>
    <Button type="submit" variant="contained" color="primary" size="small">Log-in</Button>
    </Grid>
    <h2>Get typing...</h2>

    </form>  
  </Grid>
  
</Grid>

    
  );
};

export { LogInOrRegister };