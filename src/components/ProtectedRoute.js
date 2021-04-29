import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    return (
      <Route
        exact path={path}
        {...rest}
        render={(props) => {
        //   return loggedIn ? (
            return (<ProtectedLayout component={Comp} {...props} /> )
            
        //   ) : (
            // <Redirect 
            //     to="/" 
            // />
        // );
        }}
      />
    );
  };

export { ProtectedRoute };