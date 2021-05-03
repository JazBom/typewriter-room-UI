import React from "react";
import { Route } from "react-router-dom";
import { ProtectedLayout } from "./ProtectedLayout";
// import { logOut } from "../api/capstone-server";

const ProtectedRoute = ({ component: Comp, path, pageTitle, ...rest }) => {
  // const history = useHistory();
  // const logOutHandler = (e) => {
  //     e.preventDefault();
  //     logOut();
  //     history.push('/');
  // }
    return (
      <Route
        exact path={path}
        {...rest}
        render={(props) => {
        //   return loggedIn ? (
            return (
            <ProtectedLayout 
            component={Comp} 
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