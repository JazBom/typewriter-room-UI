import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';

const NewTextItemForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(10),
        width: 200,
      },
    },
  }));
  const classes = useStyles();

  const history = useHistory();

    const [textItemForm, setTextItemForm] = useState({
      sentence: '',
      sentenceOf: '',
      imageUrl: '',
      imageOf: ''
      })

    const changeHandlerTextItemForm = (e) => {
        const newTextItemFormState = {...textItemForm};
        newTextItemFormState[e.target.name] = e.target.value;
        console.log(newTextItemFormState);
        setTextItemForm(newTextItemFormState);
    }

  //   const changeHandlerLogIn = (e) => {
  //     const newLogInFormState = {...logInForm};
  //     newLogInFormState[e.target.name] = e.target.value;
  //     console.log(newLogInFormState);
  //     setLogInForm(newLogInFormState);
  // }

  //   const logInHandler = (e) => {
  //       e.preventDefault();
  //       logIn(logInForm)
  //       .then((response) => {
  //           if(response.token) {
  //               history.replace('/home');
  //           }
  //       })
  //   }

  return (
    <Grid
    container
    display="flex"
    direction="column"
    justify="space-evenly"
    alignItems="center"
    // margin={classes.root}
    // spacing={props.theme.spacing(20)}
  >
    <Grid item xs={12} sm={12} lg={12} >
    <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
  </Grid>
  
  <Grid item xs={12} sm={12} lg={12}>
  <form className="new-text-item">
    <h2>New Text Item</h2>
    <Grid>
    <TextField
          label="Sentence"
          name="sentence"
          onChange={changeHandlerTextItemForm}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    <TextField
          label="SentenceOf"
          name="sentenceOf"
          onChange={changeHandlerTextItemForm}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
        <TextField
          label="ImageUrl"
          name="imageUrl"
          onChange={changeHandlerTextItemForm}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
        <TextField
          label="ImageOf"
          name="imageOf"
          onChange={changeHandlerTextItemForm}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
        <TextField
          label="Text"
          name="text"
          onChange={changeHandlerTextItemForm}
          id="outlined-size-small"
          variant="outlined"
          size="small"
        />
    </Grid>
    <Grid>
    <Button variant="contained" color="primary" size="small">Save</Button>
    <Button variant="contained" color="primary" size="small">Save and Publish!</Button>
    </Grid>
    </form>  
  </Grid>
  
  
  
  {/* <Grid item xs={12} sm={12} lg={12}>
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
  </Grid> */}
  
</Grid>

    
  );
};

export { NewTextItemForm };