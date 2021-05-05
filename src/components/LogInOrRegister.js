import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Box, Button, Divider, FormControl, InputAdornment, makeStyles, useTheme, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { logIn } from '../api/capstone-server';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // alignContent: 'center',
    },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1),
    width: 300,
    justifyContent: 'space-evenly',
    },
  selectEmpty: {
      marginTop: theme.spacing(1),
    },
  
}));

const LogInOrRegister = () => {

  
  const classes = useStyles();
  const theme = useTheme();
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
    <Box
    container
    className={classes.root}
  >
  <h3>the Typewriter Room</h3>
  
  <h5>Newbies</h5>
  <form>
  
<Box className={classes.formControl} style={{margin: '2rem'}}>

  
    <TextField
          size="small"
          label="Name"
          name="name"
          onChange={changeHandlerRegister}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle style={{color: 'grey'}}/>
              </InputAdornment>
            ),
          }}
        />
    <TextField
          size="small"
          label="Password"
          name="password"
          type="password"
          onChange={changeHandlerRegister}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon style={{color: 'grey'}}/>
              </InputAdornment>
            ),
          }}
        />
    <Button variant="contained" color="primary" size="small" >Register</Button>
    <Divider/>
    </Box> 
    </form>

    <Box className={classes.formControl} style={{margin: '5rem'}}>
      <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
    </Box>

    <form onSubmit={logInHandler}>
    <Box className={classes.formControl} style={{margin: '2rem'}}>
    <Divider/>
    
    <TextField
          size="small"
          label="Name"
          name="name"
          onChange={changeHandlerLogIn}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle style={{color: 'grey'}}/>
              </InputAdornment>
            ),
          }}
        />
    <TextField
          size="small"
          label="Password"
          name="password"
          type="password"
          onChange={changeHandlerLogIn}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon style={{color: 'grey'}}/>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" size="small">Log-in</Button>
    </Box>
    </form>
    <h5>Get typing...</h5>
    
  </Box>   
  );
};

export { LogInOrRegister };