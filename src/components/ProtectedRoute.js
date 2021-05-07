import React from "react";
import { Route, useHistory, Redirect } from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";
import { logOut, isLoggedIn  } from "../api/capstone-server";

const ProtectedRoute = ({ component: Comp, path, pageTitle, currentUser, ...rest }) => {

  const history = useHistory();
  const logOutHandler = (e) => {
      e.preventDefault();
      logOut();
      history.push('/');
  };

    return (
      <Route
        exact path={path}
        {...rest}
        render={props => (
        isLoggedIn() ? 
          <ProtectedLayout 
            component={Comp} 
            logOut={logOutHandler}
            pageTitle={pageTitle}
            currentUser={currentUser}
            {...props} 
            /> 
          : <Redirect to="/" />
        )}
      />
    );
  };

export { ProtectedRoute };