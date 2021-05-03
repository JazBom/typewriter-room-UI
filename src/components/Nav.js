import { React, useState } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import { DropDownMenu } from './DropDownMenu';

// import { Button, List, ListItem, ListItemText, Collapse, makeStyles, Typography } from '@material-ui/core';
// import { ExpandLess, ExpandMore } from '@material-ui/icons';
// import { Route, MemoryRouter } from 'react-router';
// import PropTypes from 'prop-types';

export const Nav = (props) => {

return (
  // <div><DropDownMenu/></div>
  
<Breadcrumbs className="nav">
<Link color="inherit" href="/home">
    Home
  </Link>
<Link color="inherit" href="/allpages">
    AllPages
  </Link>
  <Link color="inherit" href="/allpages/publishedpages">
    PublishedPages
  </Link>
  <Link color="inherit" href="/mypages">
    MyPages
  </Link>
  <Link color="inherit" href="/mypages/new">
    New
  </Link>
  <Link color="inherit" href="/" onClick={props.logOut}>
    Logout
</Link>
</Breadcrumbs>

)};
