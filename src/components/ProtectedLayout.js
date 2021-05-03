import React, { useState } from "react";
import { flexbox, spacing } from '@material-ui/system'
import { Box, makeStyles } from "@material-ui/core";
import { SideBar, sideBarWidth } from './SideBar';
import { TopBar } from './TopBar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        },
        drawHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 0),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        },
        content: {
        display: 'flex',
        position: 'relative',
        top: '100px',
        // left: '100px',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -sideBarWidth,
        // write media query to make marginLeft 0 for xs - s
        zIndex: 100
        },
        contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    }
));

const ProtectedLayout = ({ component: Comp, pageTitle, logOut, ...rest }) => {

    const classes = useStyles();
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const handleSideBarOpen = () => {
        setSideBarOpen(true);
    }
    const handleSideBarClose = () => {
        setSideBarOpen(false);
    }

    return (
        <div className={classes.root}>
        <TopBar pageTitle={pageTitle} sideBarOpen={sideBarOpen} onOpenSideBarClick={handleSideBarOpen}/>
        <SideBar sideBarOpen={sideBarOpen} onCloseSideBarClick={handleSideBarClose} logOut={logOut}/>
        <Box className={classes.content} flexDirection="row" flexWrap="wrap" justifyContent='center'>
            <Comp {...rest} />
        </Box>
        </div>
    )
};
export { ProtectedLayout };