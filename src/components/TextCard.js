import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, makeStyles, useTheme, Paper} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
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


const TextCard = ({el}) => {
    const classes = useStyles();  
    const theme = useTheme();
    
    const [expanded, setExpanded] = React.useState(false);
   
    const handleExpandClick = (el) => {
      setExpanded(!expanded);
  };
   

    return (
  <Box p={theme.spacing(2)} xs={12} sm={6} md={4} lg={3}>
<Card key={el.id} published={el.published} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="writer avatar" className={classes.avatar}>
            {el.writer.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="name of text"
        subheader={`by ${el.writer.name}`}
      />
      <CardMedia
        className={classes.media}
        image={el.inspiration.imageUrl}
        title={el.inspiration.imageOf}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {el.inspiration.sentenceOf}: {el.inspiration.sentence}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <StarBorderIcon />
          {/* make this a rating icon button */}
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => {handleExpandClick(el)}}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {el.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  </Box>
  
    )
};

export { TextCard };