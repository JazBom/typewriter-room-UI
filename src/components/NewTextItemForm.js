import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
// import { useHistory} from "react-router";
import { Button, TextField, FormHelperText, FormControl, Grid, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import { postInspoItem, postTextItem, getAllInspoItems } from '../api/capstone-server';

const NewTextItemForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(10),
        width: 200,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
        maxWidth: 600,
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  const [masterArray, setMasterArray] = useState([]);

  const [inspoItem, setInspoItem] = useState({
      sentence: '',
      sentenceOf: '',
      imageUrl: '',
      imageOf: ''
      })
  
  const [selectedSentenceOf, setSelectedSentenceOf] = useState({
        sentenceOf: ''
        })

  const [selectedSentence, setSelectedSentence] = useState({
        sentenceOf: '',
        sentence: ''
        })

  const [selectedImage, setSelectedImage] = useState({
        imageOf: '',
        imageUrl: ''
        })

  const [textItem, setTextItem] = useState({
        title: '',
        text: '',
        published: false
        })

  const [sentenceOfDropDownArray, setSentenceOfDropDownArray] = useState([]);
  const [sentenceDropDownArray, setSentenceDropDownArray] = useState([]);
  const [imageDropDownArray, setImageDropDownArray] = useState([]);


  useEffect(() => {
    getAllInspoItems()
    .then((data) => {
      console.log(data);
      setMasterArray(data);
      setSentenceOfDropDownArray(uniq(data.map(el => el.sentenceOf)));
      setImageDropDownArray(uniq(data.map(el => el)));
    });
  }, []);

  const handleSelectSentenceOf = (e) => {
          setSelectedSentenceOf({
            sentenceOf: e.target.value,
          });
          const newSentenceDropDownArray = uniq(masterArray.filter((el) => el.sentenceOf === e.target.value).map(el => el.sentence));
          console.log(newSentenceDropDownArray);
          setSentenceDropDownArray(newSentenceDropDownArray);
          setInspoItem({
            ...inspoItem,
            sentenceOf: e.target.value,
          })
        };

const handleSelectSentence = (e) => {
          setSelectedSentence({
            sentence: e.target.value
          });

          setInspoItem({
            ...inspoItem,
            sentence: e.target.value
          })
        };

  const handleSelectImage = (e) => {
    const image = [...e.target.childNodes].find(el => el.value === e.target.value);
    const imageOf = image.text;
    const imageUrl = e.target.value;
          setSelectedImage({
            ...selectedImage,
            imageUrl,
            imageOf
          });
          setInspoItem({
            ...inspoItem,
            imageUrl,
            imageOf
          })
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

  const handleSaveInspoItem = () => {
    postInspoItem(inspoItem)
    .then(() => {
      setInspoItem(
          {
          sentence: '',
          sentenceOf: '',
          imageUrl: '',
          imageOf: ''
          });
    })
  }
    const handleSaveTextItem = () => {
      postTextItem(textItem, inspoItem)
      .then(() => {
        setInspoItem(
            {
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
                    
                    <Button type="button" variant="contained" color="primary" size="small" onClick={handleSaveInspoItem}>Save Inspo</Button>
                    <Grid item xs={12} sm={12} lg={12}>     
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="sentenceOf-native-helper">Who said it?</InputLabel>
                              <NativeSelect
                              value={selectedSentenceOf.sentenceOf}
                              onChange={handleSelectSentenceOf}
                              inputProps={{
                                name: 'sentenceOf',
                                id: 'sentenceOf-native-helper',
                              }}>
                                <option aria-label="None" value="" />
                                {sentenceOfDropDownArray.map((el) => {
                                    return (
                                      <option value={el}>{el}</option>
                                    )
                                })}
                                
                              </NativeSelect>
                              </FormControl>
                              </Grid>
        

                    <Grid item xs={12} sm={12} lg={12}>  
                              <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="sentence-native-helper">What did they say?</InputLabel>
                              <NativeSelect
                              value={selectedSentence.sentence}
                              onChange={handleSelectSentence}
                              inputProps={{
                                name: 'sentence',
                                id: 'sentence-native-helper',
                              }}>
                                <option aria-label="None" value="" />
                                {sentenceDropDownArray.map((el) => {
                                        return (
                                          <option value={el}>{el}</option>
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
                                        
                                          <Button type="submit" variant="contained" color="primary" size="small" onSubmit={handleSaveTextItem}>Save</Button>
                                          <Button variant="contained" color="primary" size="small" onSubmit={handlePublishTextItem}>Save and Publish!</Button>
                      </FormControl>  
                      </Grid>     
          </Grid>
    
  )
};

export { NewTextItemForm };