import { React, useState } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
// import { Button, List, ListItem, ListItemText, Collapse, makeStyles, Typography } from '@material-ui/core';
// import { ExpandLess, ExpandMore } from '@material-ui/icons';
// import { Route, MemoryRouter } from 'react-router';
// import PropTypes from 'prop-types';

export const Nav = () => {

return (
<>
<Breadcrumbs aria-label="breadcrumb">
<Link color="inherit" href="/home">
    Home
  </Link>
<Link color="inherit" href="/allpages">
    AllPages
  </Link>
  <Link color="inherit" href="/allpages/publishedpages">
    PublishedPages
  </Link>
  <Link color="inherit" href="/allpages/mypages">
    MyPages
  </Link>
  <Link color="inherit" href="/">
    Logout
</Link>
</Breadcrumbs>
</>

)};
