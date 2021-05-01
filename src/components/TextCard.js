import React, { useState, useEffect } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, makeStyles, Paper} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: [500],
    },
  }));


const TextCard = (props) => {
    const classes = useStyles();  
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
    setExpanded(!expanded);
  };
   
const textCard = props.array.map((el) => {
    return (
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
        //   className={clsx(classes.expand, {
        //     [classes.expandOpen]: expanded,
        //   })} --> doesn't recognise 'clsx'
          onClick={handleExpandClick}
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
     
    )
    })
      return(
        <Grid className="text-item-card" classes={classes} item xs={12} sm={6} lg={3}>
            {textCard}
        </Grid>
        )
};

export { TextCard };