import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Nav } from './components/Nav';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { AllPages } from './components/AllPages';
import { MyPages } from './components/MyPages';

const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  // className={classes.root}
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
      <Nav/>
      
      <Switch>
          <Route exact path="/">
            <Container classes={classes.root}/>
          </Route>

          <Route exact path="/home">
            <Container/>
          </Route>

          <Route exact path="/allpages">
            <AllPages/>
          </Route>
          
          <Route exact path="/mypages">
            <MyPages/>
          </Route>

        </Switch>

      <Footer/>

    </ThemeProvider>
    </div>
    </Router>
  );
};

export { App };
