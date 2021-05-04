import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
// import { useHistory} from "react-router";
import { Button, Box, TextField, FormHelperText, FormControl, Divider, Grid, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import { postInspoItem, postTextItem, getAllInspoItems, getInspoItem } from '../api/capstone-server';

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
  const [masterArray, setMasterArray] = useState([]);
  const [inspoItem, setInspoItem] = useState({
      id: 0,
      sentence: '',
      sentenceOf: '',
      imageUrl: '',
      imageOf: ''
      })
  const [textItem, setTextItem] = useState({
      title: '',
      text: '',
      published: false
      })
  
  useEffect(() => {
    console.log(props);  
    getInspoItem(props.match.params.id)
      .then((data) => {
        setInspoItem(data);  
      });
  }, []);

const changeHandlerTextItem = (e) => {
    const newTextItemState = {...textItem};
      newTextItemState[e.target.name] = e.target.value;
      console.log(newTextItemState);
      setTextItem(newTextItemState);
    }
  
  const handleSaveTextItem = () => {
      postTextItem(textItem, inspoItem)
      .then(() => {
        setInspoItem(
            {
            id: 0,
            sentence: '',
            sentenceOf: '',
            imageUrl: '',
            imageOf: ''
            });
        setTextItem(
            {
            title: '',
            text: '',
            published: false
            }
            );
      })
  };

  const handlePublishTextItem = () => {
    const newPublishTextItem = {...textItem, published: true};
    postTextItem(newPublishTextItem)
    .then(() => {
      setInspoItem(
        {
        id: 0,
        sentence: '',
        sentenceOf: '',
        imageUrl: '',
        imageOf: ''
        });
    setTextItem(
        {
        title: '',
        text: '',
        published: false
        }
        );
  })
};

  return (
          <Box container className={classes.root}>
                    <Divider/>
                    <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                      <h2>Hi Jess</h2>
                      <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
                      <p>Inspo no: {inspoItem.id}</p>
                    </Box>
                    <Divider/>
                    <Box item xs={12} sm={12} md={12} lg={12}>     
                        <FormControl className={classes.formControl}>
                        <img src={inspoItem.imageUrl} alt={inspoItem.imageOf}/>
                        <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center">
                          <h3>"{inspoItem.sentence}"</h3>
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
                      <Button variant="contained" color="secondary" size="small" onSubmit={handlePublishTextItem}>Save & Publish!</Button>
                      </Box>  
          </Box>
    
  )
};

export { NewTextItem };