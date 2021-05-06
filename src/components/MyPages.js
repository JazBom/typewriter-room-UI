import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { getMyTextItems } from '../api/capstone-server';
import { TextCard } from "./TextCard";

const MyPages = () => {

  const [myPagesArray, setMyPagesArray] = useState([]);

  useEffect((e) => {
  getMyTextItems()
    .then((data) => {
      setMyPagesArray(data);
    });
  }, []);

 return (
  <Box className="mypages" container width='91.5%' >
  <Box className="text-item-cards" container display='flex' flexDirection='row' flexWrap='wrap' xs={12} sm={12} md={12} lg={12}>
    {
      myPagesArray.map((el) => {
        return (<TextCard el={el} />);
      })
    }       
  </Box>
</Box>
      )
}

export { MyPages };

