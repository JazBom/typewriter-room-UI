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
    <h2>My Pages</h2>
    <Grid container spacing={1}>
          <Grid className="text-item-card" item xs={12} sm={6} lg={3}>
            
          </Grid>
          <Grid className="text-item-card" item xs={12} sm={6} lg={3}>
            <TextCard array={myPagesArray} />
          </Grid>
          
    </Grid>
    </div>
      )
}

export { MyPages };

