import React, { useState } from "react";
import { useHistory } from "react-router";
import { Box, Button, Divider, InputAdornment, makeStyles, useTheme, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { logIn, register } from '../api/capstone-server';
import Image from '../assets/old-typewriter-vintage-paper.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(15),
    background: `url(${Image})`,
    },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    width: 400,
    
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
        setRegisterForm(newRegisterFormState);
    }

  const changeHandlerLogIn = (e) => {
      const newLogInFormState = {...logInForm};
      newLogInFormState[e.target.name] = e.target.value;
      setLogInForm(newLogInFormState);
  }

  const registerHandler = (e) => {
    e.preventDefault();
    const newRegisterFormState = {...registerForm};
    register(newRegisterFormState)
      .then((response) => {
        console.log(response);
        return logIn(newRegisterFormState)
    })
    .then((response) => {
      if(response.token) {
          history.replace('/home');
      }
  })
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
  <div className={classes.paperContainer}>  
  <h2>the Typewriter Room</h2>
  
  <Divider/>
  <p></p>
  <h5>Newbies</h5>
  
  <form onSubmit={registerHandler}>
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
    <Button type="submit" variant="outlined" color="secondary" size="small">Register</Button>
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
        <Button type="submit" variant="outlined" color="secondary" size="small">Log-in</Button>
    </Box>
    </form>
    <h5>Get typing...</h5>
  </div>  
  </Box>   
  );
};

export { LogInOrRegister };