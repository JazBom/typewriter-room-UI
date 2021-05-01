import React, { useState, useEffect } from "react";
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
      <h2>All Pages</h2>
      <TextCard array={pagesArray}/>
    </div>
    )
};

