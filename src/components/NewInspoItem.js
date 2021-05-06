import React, { useState, useEffect } from "react";
import { uniq, random } from "lodash";
import { useHistory} from "react-router-dom";
import { Button, Box, FormControl, InputLabel, makeStyles, NativeSelect, useTheme } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import { getCurrentUser, postInspoItem, getAllInspoItems, getRandomQuote, getRandomImage } from '../api/capstone-server';
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
  margin: theme.spacing(1),
}));


const NewInspoItem = (props) => {
  const currentUser = getCurrentUser().name;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [masterArray, setMasterArray] = useState([]);
  const [inspoItem, setInspoItem] = useState({
        id: 0,
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
  const [selectedImageOf, setSelectedImageOf] = useState({
          imageOf: ''
          })
  const [selectedImage, setSelectedImage] = useState({
        imageOf: '',
        imageUrl: ''
        })
  const [sentenceOfDropDownArray, setSentenceOfDropDownArray] = useState([]);
  const [sentenceDropDownArray, setSentenceDropDownArray] = useState([]);
  const [imageOfDropDownArray, setImageOfDropDownArray] = useState([]);
  const [imageDropDownArray, setImageDropDownArray] = useState([]);

  // const selectRandomId = (array) => {
  //   return Math.floor(Math.random() * array.length)
  //     };

  const getRandomInspoItem = () => {
    //call both APIs, set inspo item based on API data
    // render DisplayInspoItem with inspo item props in NewTextItem
    let randomSentenceAuthor;
    let randomSentenceText;
    getRandomQuote()
          .then((quotes) => {
            const randomSentence = quotes[random(quotes.length-1)];
            randomSentenceAuthor = randomSentence.author;
            randomSentenceText = randomSentence.text;
            return getRandomImage();
          }).then((artist) => {
            const artistName = artist.randomArtistName;
            const images =  artist.randomArtistPaintings;
            const randomImage = images[random(images.length-1)];
            setInspoItem(
              {
                sentenceOf: randomSentenceAuthor, 
                sentence: randomSentenceText,
                imageOf: randomImage.paintingName, 
                imageUrl: randomImage.url
              }
              );
          });
  };

const handleSelectSentenceOf = (e) => {
          setSelectedSentenceOf({
            sentenceOf: e.target.value,
          });
          const newSentenceDropDownArray = uniq(masterArray.filter((el) => el.sentenceOf === e.target.value).map(el => el.sentence));
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

const handleSelectImageOf = (e) => {
    setSelectedImageOf({
      imageOf: e.target.value,
    });
    const newImageDropDownArray = uniq(masterArray.filter((el) => el.imageOf === e.target.value).map(el => el.imageUrl));  
    setImageDropDownArray(newImageDropDownArray);
    setInspoItem({
      ...inspoItem,
      imageOf: e.target.value,
    })
  }

const handleSelectImage = (e) => {
    setSelectedImage({
      imageUrl: e.target.value
    });
    setInspoItem({
      ...inspoItem,
      imageUrl: e.target.value
    })
  };

  const handleSaveInspoItem = () => {
    postInspoItem(inspoItem)
    .then((createdInspoItem) => {
      setInspoItem(
        {
        ...inspoItem,
        id: createdInspoItem.id,
        });
        history.push(`/allpages/mypages/new-inspo/${createdInspoItem.id}`)
    })
  };
  
  const handleSaveInspoItemAndWrite = (e) => {
    e.preventDefault();
    postInspoItem(inspoItem)
    .then((createdInspoItem) => {
      history.push(`/allpages/mypages/new-page/inspo-item/${createdInspoItem.id}`)
    })
  };

  useEffect(() => {
    getAllInspoItems()
    .then((data) => {
      setMasterArray(data);
      setSentenceOfDropDownArray(uniq(data.map(el => el.sentenceOf)));
      setImageOfDropDownArray(uniq(data.map((el) => el.imageOf)));
    });
  }, []);

  return (
  <Box container className={classes.root}>
   {/* container - default flex direction is column */}
            <Box className="new-inspo-page-title" item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <img src="https://i.imgur.com/bxUQAmvs.png?1"/>
            <Divider/>
            <h2>Hi {currentUser}, let's get started.</h2>
            </Box>
   {/* container - default flex direction is column */}
            <Box className="inspo-selection-and-display" item display="flex" flexDirection="row" justifyContent="space-evenly" xs={12} sm={12} md={12} lg={12}>  
              {/* insp selection and display - default flex direction is row for those two items */}       
                    <Box className="new-inspo-selection" item display="flex" flexDirection="column" alignItems="center" xs={12} sm={12} md={6} lg={6}>   
              {/* insp selection  - default flex direction is column */}       
                        <Box item display="flex" flexDirection="row" justifyContent="space-evenly" xs={12} sm={12} md={12} lg={12} >
                        <h4> ... roll the </h4>
                            <Button type="button" variant="contained" color="secondary" size="small" styles={{margin: "5rem"}} onClick={getRandomInspoItem} xs={3} sm={3} md={2} lg={2}>dice</Button>
                        <h4> for inspo</h4>
                        </Box>
                        <Box className="new-inspo-display" item display="flex" flexDirection="column" justifyContent="space-evenly" xs={12} sm={12} md={6} lg={6}>  
                    {/* insp display  - default flex direction is column */}          
                            <DisplayInspoItem item={inspoItem}/>
                    </Box>                  
                        <Box item display="flex" flexDirection="column" justifyContent="space-evenly" xs={12} sm={12} md={12} lg={12}>
                        <h4>or pick something yourself </h4>
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
                        </Box>
                        
                        <Box item display="flex" flexDirection="column" alignItems="center" xs={12} sm={12} md={12} lg={12}>  
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
                          </Box>
                          
                          <Box item display="flex" flexDirection="column" alignItems="center" xs={12} sm={12} md={12} lg={12}>  
                                  <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="imageOf-native-helper">ImageOf</InputLabel>
                                  <NativeSelect
                                  value={selectedImageOf.imageOf}
                                  onChange={handleSelectImageOf}
                                  inputProps={{
                                    name: 'imageOf',
                                    id: 'imageOf-native-helper',
                                  }}>
                                    <option aria-label="None" value="" />
                                    {imageOfDropDownArray.map((el) => {
                                            return (
                                              <option value={el}>
                                                {el}</option>
                                              )
                                              })}
                                  </NativeSelect>
                                  </FormControl>   
                          </Box>    

                          <Box item display="flex" flexDirection="column" alignItems="center" xs={12} sm={12} md={12} lg={12}>  
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
                                              <option value={el}>
                                                {el}</option>
                                              )
                                              })}
                                  </NativeSelect>
                                  </FormControl> 
                          </Box>  
                    </Box>  

                    
               {/* this closes the row of two containers of inspo-select and inspo-display -> reverts to column  */}
              </Box>
   {/* container - default flex direction column */}
              <Box className="new-inspo-buttons" item display="flex" justifyContent="center" mx="5px" xs={12} sm={12} md={12} lg={12}>        
                      <Button type="button" variant="contained" color="primary" size="small" onClick={handleSaveInspoItem}>Save</Button>
                      <Button type="button" variant="contained" color="secondary" size="small" onClick={handleSaveInspoItemAndWrite}>Save & Write!</Button>      
              </Box>  
   {/* container - default flex direction column */}
    </Box> 
  )
};

export { NewInspoItem };