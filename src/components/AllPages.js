import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { getAllTextItems } from '../api/capstone-server';
import { TextCard } from "./TextCard";

export const AllPages = () => {

  const [pagesArray, setPagesArray] = useState([]);
  
  useEffect(() => {
      getAllTextItems().then((allTextItems) => {
        setPagesArray(allTextItems);
      })
    }, []);

    return(
    <div className="allpages">
      <Grid container spacing={1}>
            <Grid className="text-item-card" item xs={12} sm={6} lg={3}>
            </Grid>
            <Grid className="text-item-card" item xs={12} sm={6} lg={3}>
              <TextCard array={pagesArray}/>
            </Grid>
        </Grid>
    </div>
    )
};

