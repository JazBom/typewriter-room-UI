import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { getAllTextItems } from '../api/capstone-server';
import { TextCard } from "./TextCard";

export const AllPages = () => {

  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
      getAllTextItems()
      .then((data) => {
        setPagesArray(data);
      })
    }, []);

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

