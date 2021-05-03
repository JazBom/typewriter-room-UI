import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { SideBar, sideBarWidth } from './SideBar';
import { TopBar } from './TopBar';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      },
      drawHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
       ...theme.mixins.toolbar,
       justifyContent: 'flex-end',
      },
      content: {
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
             duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: -sideBarWidth,
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

const ProtectedLayout = ({ component: Comp, pageTitle, ...rest }) => {

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
        <SideBar sideBarOpen={sideBarOpen} onCloseSideBarClick={handleSideBarClose}/>
        <main className={classes.content}>
            <Comp {...rest} />
        </main>
        </div>
    )
};
export { ProtectedLayout };