import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Grid, Icon, Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

 // function to put textitem data in 'published page', then render many published pages? 
 // then just put 'published pages' tag in AllPages?? Do I even need AllPages?

const PublishedPages = () => {
  const classes = useStyles();  
  const [writerArray, setWriterArray] = useState([]);
  const [publishedPagesArray, setPublishedPagesArray] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:9000/api/text_items', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    })
    .then((response) => {
        console.log("GET text item response", response);
        return response.json();
    }).then((textItemData) => {
      // where published = true
        console.log("GET text item data", textItemData);
        setPublishedPagesArray(textItemData);
    });

    fetch('http://localhost:9000/api/users', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    })
    .then((response) => {
        console.log("GET users response", response);
        return response.json();
    })
    .then((users) => {
        console.log("GET user data", users);
        setWriterArray(users);
    });    
  }, []);

const publishedPages = publishedPagesArray.filter((el) => el.published === true).map((el) => {
  return (<div>
    <h3>name of text</h3>
    <ul className={el.inspiration_id}>
      { publishedPagesArray.filter((el) => el.published === true).map((el) => {
          return (
            <li
              key={el.id}
              className={el.inspiration_id}
              writer={el.writer_id}
              ratings={el.ratings[1].rating}
              // onClick={rating}
            >
              {el.text}
            </li>
          );
      })}
    </ul>
  </div>
);
})
    return(
      <div className="published-pages" classes={classes}>
         <div>
      <h2>Published Pages</h2>
      {publishedPages}
    </div>
 
    </div>
)
};

export { PublishedPages };

