import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
        justifyContent: 'flex-end',
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
                <IconButton onClick={onCloseSideBarClick}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    {/* do I need both left and right option if menu and sidebar always on left? */}
                    </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button component={RouterLink} to="/home" key="Home">
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/allpages" key="AllPages">
                    <ListItemText primary="AllPages"/>
                </ListItem><ListItem button component={RouterLink} to="/allpages/mypages" key="MyPages">
                    <ListItemText primary="MyPages"/>
                </ListItem><ListItem button component={RouterLink} to="/allpages/publishedpages" key="PublishedPages">
                    <ListItemText primary="PublishedPages"/>
                    <Divider />
                </ListItem><ListItem button component={RouterLink} onClick={props.logOut} to="/" key="Logout">
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>

        </Drawer>      
    )
};

export { SideBar, sideBarWidth };