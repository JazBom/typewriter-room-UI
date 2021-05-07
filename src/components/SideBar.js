import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";

const sideBarWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: sideBarWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: sideBarWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0,1),
        ...theme.mixins.toolbar,
        justifyContent: 'space-around',
    },
}));

const SideBar = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const { sideBarOpen, onCloseSideBarClick } = props;
    
    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={sideBarOpen}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
            <div className={classes.drawerHeader}>
                {props.search()}
            <IconButton onClick={onCloseSideBarClick}>
                <ChevronLeftIcon color="grey"/>
            </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button component={RouterLink} to="/home" key="Home">
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/allpages/publishedpages" key="PublishedPages">
                    <ListItemText primary="Published Pages"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/allpages/mypages" key="MyPages">
                    <ListItemText primary="My Pages"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/allpages/mypages/new-inspo" key="NewInspoItem">
                    <ListItemText primary="New Inspo"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/allpages/mypages/new-page" key="NewTextItem">
                    <ListItemText primary="New Page"/>
                </ListItem>
                <Divider />
                <ListItem button component={RouterLink} onClick={props.logOut} to="/" key="Logout">
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>

        </Drawer>      
    )
};

export { SideBar, sideBarWidth };