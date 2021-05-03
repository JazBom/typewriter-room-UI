import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { getPublishedTextItems } from '../api/capstone-server'
import { TextCard } from "./TextCard";

const PublishedPages = () => {
  const [publishedPagesArray, setPublishedPagesArray] = useState([]);
  useEffect(() => {
    getPublishedTextItems()
    .then((data) => {
      setPublishedPagesArray(data);
    })
  }, []);
   
    return(
      <Box className="allpages" container >
        <Box className="text-item-cards" container display='flex' flexDirection='row' flexWrap='wrap' xs={12} sm={12} md={12} lg={12}>
          {
            publishedPagesArray.map((el) => {
              return (<TextCard el={el} />);
            })
          }       
        </Box>
    </Box>
      )
};

export { PublishedPages };

