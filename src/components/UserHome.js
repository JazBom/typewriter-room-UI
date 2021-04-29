import React from "react";
import { Grid } from '@material-ui/core';
import {Nav} from './Nav';
import { Register } from './Register';
import { LogIn } from './LogInOrRegister';
import { TextCard } from './TextCard';


const UserHome = (props) => {
    return (
    <div className="container">
      <Nav/> 
      <Grid container spacing={1}>
        {/* <Grid className="hamburger list" item xs={3} sm={3} lg={3}>
          something here
        </Grid> */}
        <TextCard/>
      </Grid> 
    </div>
)
};

export { UserHome };

