import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Paper } from '@material-ui/core';

const Container = (props) => {

    return (
        <div className="container">
        <header className="App-header">
            The Typewriter Room
        </header>
       
        <Card variant="outlined">
        <h3>Card title</h3>
      </Card>
        <Button variant="contained" color="primary">Hello!</Button>
    
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={props.classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={props.classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={props.classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={props.classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={props.classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={props.classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={props.classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>

)
};

export { Container };

