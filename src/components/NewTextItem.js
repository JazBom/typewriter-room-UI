import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
import { useHistory } from "react-router-dom";
import { Button, Box, TextField, FormHelperText, FormControl, Divider, Grid, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import { postInspoItem, postTextItem, getMyTextItems, getInspoItem } from '../api/capstone-server';

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
  
}));

const NewTextItem = (props) => {

  const classes = useStyles();
  const history = useHistory();

  const [inspoItem, setInspoItem] = useState({
      id: 0,
      sentence: '',
      sentenceOf: '',
      imageUrl: '',
      imageOf: '',
      })
  const [textItem, setTextItem] = useState({
      title: '',
      text: '',
      published: false,
      inspiration_id: 0,
      writer_id: 0,
      })
  
  useEffect(() => {
    console.log(props);  
    getInspoItem(props.match.params.id)
      .then((data) => {
        setInspoItem(data);  
        })
        .then(
          setTextItem({
          ...textItem,
          inspiration_id: props.match.params.id,
          //change below to get writer id from current user when know how defined
          writer_id: 2,
      }))
  }, []);

const changeHandlerTextItem = (e) => {
    const newTextItemState = {...textItem};
      newTextItemState[e.target.name] = e.target.value;
      console.log(newTextItemState);
      setTextItem(newTextItemState);
    }
  
  const handleSaveTextItem = () => {
    const newTextItem = {...textItem};
      postTextItem(newTextItem)
      .then(getMyTextItems())
      .then(
        history.push('/allpages/mypages')
        )
  };

  const handlePublishTextItem = () => {
    const newTextItem = {...textItem};
    const newPublishTextItem = {...newTextItem, published: true};
    postTextItem(newPublishTextItem)
    .then(getMyTextItems())
    .then(
      history.push('/allpages/mypages')
      )
};

  return (
          <Box container className={classes.root}>
                    <Divider/>
                    <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                      <h2>Hi Jess</h2>
                      <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
                      { inspoItem.id > 0 ? (<h5>Inspo ref: {inspoItem.id}</h5>) : (<h5></h5>) }
                    </Box>
                    <Divider/>
                    <Box item xs={12} sm={12} md={12} lg={12}>     
                        <FormControl className={classes.formControl}>
                        <img src={inspoItem.imageUrl} alt={inspoItem.imageOf}/>
                        <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center">
                          <h3>"..{inspoItem.sentence}."</h3>
                          <p>{inspoItem.sentenceOf}</p>
                        </Box>
                        </FormControl>  
                    </Box>

                    <Divider/>
                    <Box item xs={12} sm={12} lg={12}>
                    <FormControl className={classes.formControl}>
                                          
                                              <TextField
                                                label="Title"
                                                name="title"
                                                onChange={changeHandlerTextItem}
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                              />
                                          
                                              <TextField
                                                label="Text"
                                                name="text"
                                                onChange={changeHandlerTextItem}
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="large"
                                                
                                              />
                          </FormControl>  
                      </Box> 
                    <p></p>
                    <Divider/>
                    <p></p>
                      <Box item display="flex" justifyContent="center" mx="5px"xs={12} sm={12} md={6} lg={6}>              
                      <Button type="submit" variant="contained" color="primary" size="small" onClick={handleSaveTextItem}>Save</Button>
                      <Button type="submit" variant="contained" color="secondary" size="small" onClick={handlePublishTextItem}>Save & Publish!</Button>
                      </Box>  
          </Box>
    
  )
};

export { NewTextItem };