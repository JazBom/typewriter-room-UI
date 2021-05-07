import React, { useEffect, useState } from "react";
import { Box } from '@material-ui/core';
import Image from '../assets/TypewriterDiagram.jpeg';

// import { getRandomInspoItem, getRandomPublishedTextItem } from '../api/capstone-server';
// import { DisplayInspoItem } from './DisplayInspoItem';
// import { TextCard } from './TextCard';
// const storyOfTheDay = () => {
//   getRandomPublishedTextItem()
//   .then((el) =>  {
//     console.log(el);
//     return el;
//   })
// }
// const inspoOfTheDay = () => {
//   getRandomInspoItem()
//   .then((item) =>  {
//     console.log(item);
//     return item;
//   })
// }
const Home = (props) => {
    // const [publishedItem, setPublishedItem] = useState({});
    // const [inspoItem, setInspoItem] = useState({});

    // useEffect(() => {
    //   Promise.all(getRandomPublishedTextItem, getRandomInspoItem).then(([randomPublishedItem, randomInspoItem]) => {
    //     setPublishedItem(randomPublishedItem);
    //     setInspoItem(randomInspoItem);
    //   });
    // }, []);

    return (
      <Box className="home" container width="94%" >
        <Box className="text-item-card" container display='flex' flexDirection='row' flexWrap='wrap' justifyContent="center" xs={12} sm={12} md={12} lg={12}>
          <img src={Image} width="100%" zIndex="0"/>
            {/* <TextCard el={publishedItem} />
            <DisplayInspoItem item={inspoItem} /> */}
        </Box>
      </Box>
      )
};

export { Home };

