import React, { useState, useEffect } from "react";
import { uniq } from "lodash";
import { useHistory} from "react-router-dom";
import { Button, Box, TextField, FormHelperText, FormControl, InputLabel, makeStyles, NativeSelect, useTheme } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import { postInspoItem, getAllInspoItems, getInspoItem } from '../api/capstone-server';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
    },
  formControl: {
      margin: theme.spacing(1),
      width: 300,
      // minWidth: 310,
      // maxWidth: 600,
    },
  selectEmpty: {
      marginTop: theme.spacing(1),
    },
  margin: theme.spacing(1),
}));

const NewInspoItem = (props) => {
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

  useEffect(() => {
    getAllInspoItems()
    .then((data) => {
      console.log(data);
      setMasterArray(data);
      setSentenceOfDropDownArray(uniq(data.map(el => el.sentenceOf)));
      setImageOfDropDownArray(uniq(data.map((el) => el.imageOf)));
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

  const handleSelectImageOf = (e) => {
    setSelectedImageOf({
      imageOf: e.target.value,
    });
    const newImageDropDownArray = uniq(masterArray.filter((el) => el.imageOf === e.target.value).map(el => el.imageUrl));
    console.log(newImageDropDownArray);
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

  const handleRandomInspoItem = () => {
    //random API call via capstone server
    // const randomInspo = functionAPICall
    //setInspoItem(randomInspo)
    //then rest inspo item to empty?
  }

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

  return (
          <Box container className={classes.root}>
            <Divider/>
            <Box item display="flex" flexDirection="column" alignSelf="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <Divider/>
            <h3></h3>
            </Box>
                    {/* <Button type="button" variant="contained" color="primary" size="small" onClick={handleFindInspoItem}>Play it safe</Button>
                    <Button type="button" variant="contained" color="primary" size="small" onClick={handleRandomInspoItem}>Roll the dice</Button> */}
                    <Box item display="flex" flexDirection="row" justifyContent="space-evenly" xs={12} sm={12} md={12} lg={12} >
                    <h4> ... roll the </h4>
                    <Button type="button" variant="contained" color="secondary" size="small" onClick={handleRandomInspoItem} xs={3} sm={3} md={2} lg={2}>dice</Button>
                    <h4> for inspo</h4>
                    </Box>
                    <p></p>
                    <Divider/>
                    <p></p>
                    <Box item display="flex" flexDirection="column" alignItems="center" xs={12} sm={12} md={12} lg={12}>     
                    <h5>or pick something yourself </h5>
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
                              <img id="selectedImage" src={selectedImage.imageUrl}/>
                              </FormControl> 
                    { inspoItem.id === 0 ? (<h5></h5>) : (<h5>Inspo ref: {inspoItem.id}</h5>) }
                    </Box>  
                    <Divider/>
                    <p></p>
                      <Box item display="flex" justifyContent="center" mx="5px" xs={12} sm={12} md={12} lg={12}>        
                      <Button type="button" variant="contained" color="primary" size="small" onClick={handleSaveInspoItem}>Save</Button>
                      <Button type="button" variant="contained" color="secondary" size="small" onClick={handleSaveInspoItemAndWrite}>Save & Write!</Button>      
                      </Box>  
              </Box>
         
  )
};

export { NewInspoItem };