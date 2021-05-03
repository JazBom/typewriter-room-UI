import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Button, List, Link, ListItem, ListItemText, Collapse, makeStyles, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { App } from '../App';
import { Home } from './Home';
import { AllPages } from './AllPages';
import { MyPages } from './MyPages';
import { PublishedPages } from './PublishedPages';
import { NewTextItemForm } from "./NewTextItemForm";

const DropDownMenu = (props) => {
    // why does RouterLink need to be imported and identified as components in Link
    // which is usually from React router dom but here is imported from Material UI
    // what are the props being passed in and how are they different from the theme props I'm passing in?
    // ie can I just do this once via theme and access via Nav props? e.g. this.something 
    // is props below going to conflict with RouterLink props below?
    const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
    
    const navMap = {
    '/home': 'Home',
    '/allpages': 'AllPages',
    '/allpages/byimage': 'ByImage',
    '/allpages/byspeaker': 'BySpeaker',
    '/mypages': 'MyPages',
    '/mypages/indraft': 'InDraft',
    '/mypages/published': 'Published',
    '/mypages/new': 'New',
    '/': 'Logout',
    };

    const useStyles = makeStyles(props.theme) 
    const classes = useStyles(); // do I need this, 
    
    const [open, setOpen] = useState(true);
    
    const handleClick = () => {
      setOpen((prevOpen) => !prevOpen);
    };
   
    const ListItemLink = (props) => {
        const { to, open, ...other } = props;
        const primary = navMap[to];
        return (
          <li>
            <ListItem button component={RouterLink} to={to} {...other}>
            <ListItemText primary={primary} />
            {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
          </li>
        );
      }
    
    ListItemLink.propTypes = {
      open: PropTypes.bool,
      to: PropTypes.string.isRequired,
    };


  return (

    <MemoryRouter className="nav" initialEntries={['/home', '/allpages', '/mypages', '/logout']} initialIndex={0}>
      <div className={props.navRoot}>
        <Route>

          { ({ location }) => {
           //what does this do? what is the x, is it equivalent of 'el'? ie. if there is a valid element, then return that?
            const pathnames = location.pathname.split('/').filter((x) => x);

            return (

                <Breadcrumbs aria-label="breadcrumb">

                <LinkRouter color="inherit" to="/home">
                 Home
                </LinkRouter>

                <LinkRouter color="inherit" to="/allpages">
                  AllPages
                </LinkRouter>

                <LinkRouter color="inherit" to="/mypages">
                  MyPages
                </LinkRouter>

                <LinkRouter color="inherit" to="/">
                  Logout
                </LinkRouter>

                  {/* ask how this wors with pathnames value above, what to put in 'value'? */}
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                  return last ? (<Typography color="textPrimary" key={to}>{navMap[to]}</Typography>) : ( <LinkRouter color="inherit" to={to} key={to}>{navMap[to]}</LinkRouter>);
                })}

                </Breadcrumbs>
              );
            }}

        </Route>

        <nav className={props.navLists} aria-label="navigation bar items">
          <List>
            <ListItemLink to="/home" />
            <ListItemLink to="/allpages" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/allpages/byimage" className={props.navNested} />
                <ListItemLink to="/allpages/byspeaker" className={props.navNested} />
              </List>
            </Collapse>
            <ListItemLink to="/mypages" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/mypages/indraft" className={props.navNested} />
                <ListItemLink to="/mypages/published" className={props.navNested} />
                <ListItemLink to="/mypages/new" className={props.navNested} />
              </List>
            </Collapse>
            <ListItemLink to="/" label="Logout"/>
          </List>
        </nav>

      </div>

    </MemoryRouter>

  );
}

export { DropDownMenu };

