import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { getPublishedTextItems } from '../api/capstone-server'
import { TextCard } from "./TextCard";

const PublishedPages = () => {
  const [publishedPagesArray, setPublishedPagesArray] = useState([]);
  useEffect(() => {
    getPublishedTextItems().then((data) => {
      setPublishedPagesArray(data);
    })
  }, []);
   
    return(
      <div>
      <Grid container spacing={1}>
            <Grid className="text-item-card" item xs={12} sm={6} lg={3}>
            </Grid>
            <Grid className="published-pages" item xs={12} sm={6} lg={3}>
                <TextCard array={publishedPagesArray}/>
            </Grid>
      </Grid>
      </div>
      )
};

export { PublishedPages };

