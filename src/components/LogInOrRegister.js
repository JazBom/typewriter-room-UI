import React, { useState } from "react";
import { useHistory } from "react-router";
import { Box, Button, Collapse, Divider, IconButton, InputAdornment, makeStyles, useTheme, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
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
  const [open, setOpen] = React.useState(true);
  const [registerErrorVisible, setRegisterErrorVisible] = useState(false);
  const [logInErrorVisible, setLogInErrorVisible] = useState(false);
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
  .catch((error) => {
    console.log('error registering:', error);
    setRegisterErrorVisible(true);
    // setOpen(true); -> opens both login and register alert, need unique one
})
}

const logInHandler = (e) => {
        e.preventDefault();
        logIn(logInForm)
        .then((response) => {
            if(response.token) {
                history.replace('/home');
            } else {
              history.replace('/');
                setLogInErrorVisible(true)
            }
        })
        .catch((error) => {
          console.log('error logging in:', error);
          setLogInErrorVisible(true);
          // setOpen(true); -> opens both login and register alert, need unique one
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
  { 
  registerErrorVisible ? (
  <div><Collapse in={open}>
  <Alert
  severity="error"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
  >
    <strong>Error</strong> not registered.
  </Alert>
</Collapse>
</div>
  ) : (
  <h5>Newbies</h5>
  ) 
  }

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
  { 
  logInErrorVisible ? (
  <div><Collapse in={open}>
  <Alert
  severity="error"
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
  >
    <strong>Error</strong> could not log-in.
  </Alert>
</Collapse>
</div>
  ) : (
  <h5>Get typing...</h5>
  ) 
  }
  </div>  
  </Box>   
  );
};

export { LogInOrRegister };