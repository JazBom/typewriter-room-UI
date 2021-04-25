import React from "react";
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

const PublishedPage = () => {
  const classes = useStyles();
    return(
      <div className="published-page" classes={classes}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
        <Grid item>
              <Icon/>
            </Grid>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Image name
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Image Url
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Author name
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <Button>Rate this page!</Button>
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
        </Grid>
      </Paper>
 
    </div>
)
};

export { PublishedPage };

