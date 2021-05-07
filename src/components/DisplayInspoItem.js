import React from "react";
import { Box, FormControl, makeStyles } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";

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

  return (
          <Box container className={classes.root}>
            <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                      
                      <Divider/>
                      
                      { props.item.id > 0 ? (<h5>Inspo ref: {props.item.id}</h5>) : (<h5></h5>) }
                    </Box>
                    <Divider/>
                    <Box item xs={12} sm={12} md={12} lg={12}>    
                    
                        <FormControl className={classes.formControl}>
                        <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center">
                        { props.item.imageOf || props.item.imageUrl ? (<h5>"..{props.item.sentence}."  -  {props.item.sentenceOf}</h5>) : (<h5></h5>) }
                        </Box>
                        <img src={props.item.imageUrl}/>
                        <h6>{props.item.imageOf}</h6> 
                        
                        </FormControl>  
                    </Box> 
                    <Divider/>
              </Box>
         
  )
};

export { DisplayInspoItem };