import React from "react";
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

const Register = () => {
const classes = useStyles();
return (
    <Grid  container
     display="flex"
     direction="column"
     justify="space-around"
     alignItems="center"
     padding={5}
     spacing={0}> 

   
    </Grid>
  );
};

export { Register };