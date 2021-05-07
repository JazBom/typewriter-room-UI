import React, { useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { getCurrentUser } from './api/capstone-server.js';
import { LogInOrRegister } from './components/LogInOrRegister';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { MyPages } from './components/MyPages';
import { PublishedPages } from './components/PublishedPages';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NewInspoItem } from "./components/NewInspoItem";
import { NewTextItem } from "./components/NewTextItem"

const App = () => {

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
          pageTitle="Your Typewriter Room"
          />

          <ProtectedRoute 
          path="/allpages/publishedpages"
          component={PublishedPages}
          pageTitle="Published Pages"
          />

          <ProtectedRoute 
          path="/allpages/mypages/new-inspo"
          component={NewInspoItem}
          pageTitle="New Inspiration"
          />

          <ProtectedRoute 
          path="/allpages/mypages/new-page/inspo-item/:id"
          component={NewTextItem}
          pageTitle="New Page"
          />

          <ProtectedRoute 
          path="/allpages/mypages/new-page"
          component={NewTextItem}
          pageTitle="New Page"
         />

          <ProtectedRoute 
          path="/allpages/mypages"
          component={MyPages}
          pageTitle="My Pages"
          />

        </Switch>

      <Footer/>

    </ThemeProvider>
    </div>
    </Router>
  );
};

export { App };
