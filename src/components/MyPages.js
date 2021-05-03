import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { getMyTextItems } from '../api/capstone-server';

import { TextCard } from "./TextCard";

const MyPages = () => {
  const [myPagesArray, setMyPagesArray] = useState([]);
  useEffect(() => {
    getMyTextItems()
    .then((data) => {
      setMyPagesArray(data);
    });
  }, []);

 return (
    <div>   
    <TextCard array={myPagesArray} />
    </div>
      )
}

export { MyPages };

