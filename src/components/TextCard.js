import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, makeStyles, useTheme, Paper} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { getAllRatings, postRating } from '../api/capstone-server';

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
  }));

const TextCard = (props) => {
    const classes = useStyles();  
    const theme = useTheme();
    const [defaultRating, setDefaultRating] = React.useState(props.el.avg_rating);
    const [expanded, setExpanded] = React.useState(false);
    
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

    const handleExpandClick = (el) => {
      setExpanded(!expanded);
    };

    return (
  <Box p={theme.spacing(2)} xs={12} sm={12} md={6} lg={4}>
<Card key={props.el.id} published={props.el.published} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="writer avatar" className={classes.avatar}>
            {props.el.writer.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.el.title}
        subheader={`by ${props.el.writer.name}`}
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
        <IconButton aria-label="add text-item to favorites">
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {props.el.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  </Box>
  
    )
};

export { TextCard };