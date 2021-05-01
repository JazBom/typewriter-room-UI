import React, { useState, useEffect } from "react";
import { useHistory} from "react-router";
import { Button, TextField, FormHelperText, FormControl, Grid, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import { getAllInspoItems } from '../api/capstone-server';

const NewTextItemForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(10),
        width: 200,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const history = useHistory();

  const [inspoItem, setInspoItem] = useState({
      id: 0,
      sentence: '',
      sentenceOf: '',
      imageUrl: '',
      imageOf: ''
      })
  
  const [selectedSentenceOf, setSelectedSentenceOf] = useState({
        id: 0,
        sentenceOf: ''
        })

  const [selectedSentence, setSelectedSentence] = useState({
        id: 0,
        sentence: ''
        })

  const [selectedImage, setSelectedImage] = useState({
        imageOf: '',
        imageUrl: ''
        })

  const [textItem, setTextItem] = useState({
        title: '',
        text: ''
        })

  const [sentenceOfDropDownArray, setSentenceOfDropDownArray] = useState([]);
  const [sentenceDropDownArray, setSentenceDropDownArray] = useState([]);
  const [imageDropDownArray, setImageDropDownArray] = useState([]);


  useEffect(() => {
    getAllInspoItems()
    .then((data) => {
      console.log(data);
      setSentenceOfDropDownArray(data);
      setSentenceDropDownArray(data);
      setImageDropDownArray(data);
    });
  }, []);

  const handleSelectSentenceOf = (e) => {
          const sentenceOf = [...e.target.childNodes].find(el => el.value === e.target.value).text;
          setSelectedSentenceOf({
            id: e.target.value,
            sentenceOf
          });

          setInspoItem({
            ...inspoItem,
            sentenceOf
          })
        };

const handleSelectSentence = (e) => {
          const sentence = e.target.text;
          setSelectedSentence({
            id: e.target.value,
            sentence
          });

          setInspoItem({
            ...inspoItem,
            sentence
          })
        };

  const handleSelectImage = (e) => {
    const image = [...e.target.childNodes].find(el => el.value === e.target.value);
    const imageOf = image.text;
          setSelectedImage({
            ...selectedImage,
            imageUrl: e.target.value,
            imageOf
          });
        };

  // const handleChangeInspoItem = (e) => {
  //         const name = e.target.name;
  //         setInspoItem({
  //           ...inspoItem,
  //           [name]: e.target.value,
  //         });
  //       };

  const changeHandlerTextItem = (e) => {
        const newTextItemState = {...textItem};
        newTextItemState[e.target.name] = e.target.value;
        console.log(newTextItemState);
        setTextItem(newTextItemState);
    }

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
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="sentenceOf-native-helper">Who said it?</InputLabel>
                              <NativeSelect
                              value={selectedSentenceOf.id}
                              onChange={handleSelectSentenceOf}
                              inputProps={{
                                name: 'sentenceOf',
                                id: 'sentenceOf-native-helper',
                              }}>
                                <option aria-label="None" value="" />
                                {sentenceOfDropDownArray.map((el) => {
                                    return (
                                      <option value={el.id}>{el.sentenceOf}</option>
                                    )
                                })}
                              </NativeSelect>
                              </FormControl>
                              <FormControl className={classes.formControl}>
                        
                        <InputLabel htmlFor="sentence-native-helper">What did they say?</InputLabel>
                              <NativeSelect
                              value={selectedSentence.id}
                              onChange={handleSelectSentence}
                              inputProps={{
                                name: 'sentence',
                                id: 'sentence-native-helper',
                              }}>
                                <option aria-label="None" value="" />
                                {sentenceDropDownArray.filter((el) => el.sentenceOf === selectedSentenceOf.sentenceOf).map((el) => {
                                        return (
                                          <option value={el.id}>{el.sentence}</option>
                                          )
                                          })}
                                      
                              </NativeSelect>
                              </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={12}>
                    <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="image-native-helper">Image</InputLabel>
                              <NativeSelect
                              value={selectedImage.imageUrl}
                              onChange={handleSelectImage}
                              inputProps={{
                                name: 'image',
                                id: 'image-native-helper',
                              }}>
                                <option aria-label="None" value="" />
                                {imageDropDownArray.map((el) => {
                                        return (
                                          <option value={el.imageUrl}>{el.imageOf}</option>
                                          )
                                          })}
                              </NativeSelect>
                              <img id="selectedImage" src={selectedImage.imageUrl}/>
                    </FormControl>
                    </Grid>     

                    <Grid item xs={12} sm={12} lg={12}>
                    <FormControl className={classes.formControl}><h2>New Text Item</h2>
                                          
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
                                                size="small"
                                              />
                                        
                                          <Button variant="contained" color="primary" size="small">Save</Button>
                                          <Button variant="contained" color="primary" size="small">Save and Publish!</Button>
                      </FormControl>  
                      </Grid>     
          </Grid>
    
  )
};

export { NewTextItemForm };