import React from "react";
import { Route, useHistory } from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";
import { logOut } from "../api/capstone-server";

const ProtectedRoute = ({ component: Comp, path, pageTitle, ...rest }) => {

  const history = useHistory();
  const logOutHandler = (e) => {
      e.preventDefault();
      logOut();
      history.push('/');
  }
    return (
      <Route
        exact path={path}
        {...rest}
        render={(props) => {
        //   LoggedIn() return true ? (
            return (
            <ProtectedLayout 
            component={Comp} 
            logOut={logOutHandler}
            pageTitle={pageTitle}
            {...props} 
            /> )
            
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