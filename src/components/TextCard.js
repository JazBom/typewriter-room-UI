import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, makeStyles, useTheme, TextareaAutosize } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { getCurrentUser, deleteTextItem, editTextItem, publishTextItem, postRating } from '../api/capstone-server';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300,
      maxWidth: 300,
      minHeight: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', 
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: theme.palette.primary,
    },
    textarea: {
      resize: "both"
    }
  }));

const TextCard = (props) => {
    const classes = useStyles();  
    const history = useHistory();
    const theme = useTheme();
    const [defaultRating, setDefaultRating] = React.useState(props.el.avg_rating);
    const [publishText, setPublishText] = React.useState(props.el);
    const [editedText, setEditedText] = React.useState(props.el);
    const [expanded, setExpanded] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
//     const cardIcons = () => { 
// }
    const handleNewRating = (newRatingValue) => {
      const newRating = {
        rating: {
          text_item_id: props.el.id,
          rating: newRatingValue,
          //update ID to be current-user - check in local storage
          rater_id: 2
        }
      }
      postRating(newRating)
      .then((averageRating) => {
        setDefaultRating(averageRating);
      })
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
      if (editing) {setEditing(false)}; 
    };

    
    const changeHandlerEditTextItem = (e) => {
      const newEditedText = {...props.el, text: e.target.value};
      setEditedText(newEditedText);
      }

    const handleSaveEditedItem = (e) => {
        editTextItem(editedText)
        setEditing(false)
      }
    
    const handleSelectEditItem = (e) => {
      setExpanded(true);
      setEditing(true);
    }

    const handlePublishItem = (e) => {
      const newPublishText = {...props.el, published: true};
      publishTextItem(newPublishText)
      .then(      
        setPublishText(newPublishText)
      )
    };

    const handleDeleteItem = () => {
      deleteTextItem(props.el.id)
      .then(      
        history.push('/allpages/mypages')
      )
    };

    return (
  <Box p={theme.spacing(2)} xs={12} sm={12} md={6} lg={4}>
<Card key={props.el.id} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="writer avatar" className={classes.avatar}>
            <h6>{props.el.writer.name}</h6>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.el.title}
        subheader={
          publishText.published ? ('published') : ('in-draft')
        }
      />
      <CardMedia
        className={classes.media}
        image={props.el.inspiration.imageUrl}
        title={props.el.inspiration.imageOf}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.el.inspiration.sentenceOf}: {props.el.inspiration.sentence}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
     
      {props.el.writer_id!==getCurrentUser().id && 
      <IconButton aria-label="rate text-item">
          <Rating
          name={`simple-controlled${props.el.id}`}
          precision={0.5}
          size="small"
          value={defaultRating}
          onChange={
            (event, newRatingValue) => {
              handleNewRating(newRatingValue);}
            }
          />
      </IconButton> 
      }

      {!publishText.published &&
      <IconButton aria-label="publish text-item">
          <PublishRoundedIcon
          size="small"
          onClick={() => {handlePublishItem(props.el.id)}}
          />
      </IconButton>
      } 

      {props.el.writer_id!==getCurrentUser().id && 
      <IconButton aria-label="add text-item to favorites">
        <FavoriteIcon/>
      </IconButton> 
      }
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => {handleExpandClick(props.el)}}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

        { editing ? (
        props.el.writer_id===getCurrentUser().id && 
        <IconButton aria-label="save text-item">
        <SaveIcon 
                size="small"
                value={editedText}
                onClick={
                (event, newEditedText) => {
                handleSaveEditedItem(newEditedText);}
                }
              />
        </IconButton>
        ) : (
        props.el.writer_id===getCurrentUser().id && 
        <IconButton aria-label="edit text-item">
          <EditIcon
          size="small"
          onClick={handleSelectEditItem}
          />
        </IconButton>
        )
      }

      {props.el.writer_id===getCurrentUser().id && 
      <IconButton aria-label="delete text-item">
          <DeleteIcon
          size="small"
          onClick={() => {handleDeleteItem(props.el.id)}}
          />
      </IconButton>
      }

      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
          editing ? ( 
          <TextareaAutosize 
          style={{ minWidth: "100%", maxWidth: "100%", outline: "none" }} 
          rowsMin={10} 
          aria-label="editable textarea"
          onChange={changeHandlerEditTextItem}
          >
            {editedText.text}
          </TextareaAutosize>
          ) : (
          <Typography paragraph>{editedText.text}</Typography>
          )}
        </CardContent>
      </Collapse>
      
    </Card>

  </Box>
  
    )
};

export { TextCard };