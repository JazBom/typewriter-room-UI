import React, { useState, useEffect } from "react";

import { Box, makeStyles, useTheme } from "@material-ui/core";
import clsx from 'clsx';
import { getAllTextItems } from '../api/capstone-server';
import { TextCard } from "./TextCard";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1),
      justifyContent: 'space-evenly',
      width: '100%',
  },
}));
export const AllPages = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
      getAllTextItems()
      .then((data) => {
        setPagesArray(data);
      })
    }, []);
  
  //   const handleRating = (array) => {
  //     let newRatingsArray = [];
  //   let rObj = {};  
  //   array.map(obj => {
  //     rObj = obj.rating;
  //     return rObj;
  //   });
  //   newRatingsArray.push(rObj);
  //   return newRatingsArray;
  // };

  return(
    <Box className='all-pages' container display='flex' width='91.5%' >
        <Box className="text-item-cards" container display='flex' flexDirection='row' flexWrap='wrap' xs={12} sm={12} md={12} lg={12}>
          {
            pagesArray.map((el) => {
              return (<TextCard el={el} />);
            })
          }       
        </Box>
    </Box>
    )
};

