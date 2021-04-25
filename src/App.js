import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { LogInOrRegister } from './components/LogInOrRegister';
import { UserHome } from './components/UserHome';
import { Footer } from './components/Footer';
import { AllPages } from './components/AllPages';
import { MyPages } from './components/MyPages';

const App = () => {
 
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
      
      <Switch>

          <Route exact path="/">
            <LogInOrRegister/>
          </Route>

          <Route exact path="/user-home">
            <UserHome/>
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
