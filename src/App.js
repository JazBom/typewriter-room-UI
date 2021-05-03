import React, { useState} from "react";
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
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { AllPages } from './components/AllPages';
import { MyPages } from './components/MyPages';
import { PublishedPages } from './components/PublishedPages';
import { TextCard } from './components/TextCard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedLayout } from "./components/ProtectedLayout";
import { NewTextItemForm } from "./components/NewTextItemForm";


const App = () => {

  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const onLogin = () => {
  //   setLoggedIn(true);
  // }

  // const onLogout = () => {
  //   setLoggedIn(false);
  // }
 
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
    
      <Switch>

          <Route exact path="/">
            <LogInOrRegister/>
          </Route>

          <ProtectedRoute 
          path="/home"
          component={Home}
          pageTitle="The Typewriter Room"/>

          <ProtectedRoute 
          path="/allpages/publishedpages"
          component={PublishedPages}
          pageTitle="Published Pages"/>

          <ProtectedRoute 
          path="/allpages/mypages/new"
          component={NewTextItemForm}
          pageTitle="New Text Item"/>

          <ProtectedRoute 
          path="/allpages/mypages"
          component={MyPages}
          pageTitle="My Pages"/>

          <ProtectedRoute 
          path="/allpages"
          component={AllPages}
          pageTitle="All Pages"/>

        </Switch>

      <Footer/>

    </ThemeProvider>
    </div>
    </Router>
  );
};

export { App };
