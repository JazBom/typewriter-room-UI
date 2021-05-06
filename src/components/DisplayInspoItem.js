import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
import { useHistory} from "react-router-dom";
import { Button, Box, FormControl, InputLabel, makeStyles, NativeSelect, useTheme } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import { getCurrentUser, postInspoItem, getAllInspoItems, getAllArtImages, getAllImagesOfArtist, getAnImageOfArtist } from '../api/capstone-server';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
    },
  formControl: {
      margin: theme.spacing(1),
      width: 300,
    },
  selectEmpty: {
      marginTop: theme.spacing(1),
    },
  margin: theme.spacing(1),
}));

const DisplayInspoItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const currentUser = getCurrentUser().name;

  return (
          <Box container className={classes.root}>
            <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                      
                      <Divider/>
                      
                      { props.item.id > 0 ? (<h5>Inspo ref: {props.item.id}</h5>) : (<h5></h5>) }
                    </Box>
                    <Divider/>
                    <Box item xs={12} sm={12} md={12} lg={12}>    
                    
                        <FormControl className={classes.formControl}>
                        <h5>{props.item.imageOf}</h5> 
                        <img src={props.item.imageUrl}/>
                        <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center">
                          
                          <h5> "..{props.item.sentence}."  -  {props.item.sentenceOf}</h5>
                    
                        </Box>
                        </FormControl>  
                    </Box> 
              </Box>
         
  )
};

export { DisplayInspoItem };