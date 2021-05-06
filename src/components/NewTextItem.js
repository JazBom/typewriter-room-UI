import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Box, TextField, FormControl, Divider, makeStyles } from '@material-ui/core';
import { postTextItem, getCurrentUser, getAllTextItems, getMyTextItems, getInspoItem } from '../api/capstone-server';
import { DisplayInspoItem } from './DisplayInspoItem';

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
  const currentUser = getCurrentUser().name;
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
          writer_id: getCurrentUser().id,
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
      getAllTextItems()
      )
};

  return (
          <Box container className={classes.root}>
            <Box className="new-inspo-page-title" item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
            <Divider/>
            { inspoItem.id > 0 ? (<h2>Nice choice {currentUser}!</h2>) : (<h2>Hi {currentUser}! You don't have inspo.. </h2>) }
            
            </Box>
                    <Divider/>
                    <DisplayInspoItem item={inspoItem} />
                    <Divider/>

                    <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            
                    <h4>a blank page</h4>
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