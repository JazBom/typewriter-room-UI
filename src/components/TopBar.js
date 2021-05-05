import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import clsx from 'clsx';
import { sideBarWidth } from './SideBar';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
           duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
          width: `calc(100% - ${sideBarWidth}px)`,
          marginLeft: sideBarWidth,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
           duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
          marginRight: theme.spacing(2),
      },
      hide: {
          display: 'none',
      },
}));

const TopBar = (props) => {

    const classes = useStyles();
    const { pageTitle, sideBarOpen, onOpenSideBarClick } = props;
    

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: sideBarOpen,
        })}
        >
            <Toolbar display="flex" flexDirection="row" justifyContent="space-evenly">
                <IconButton
                color="inherit"
                aria-label="open-drawer"
                onClick={onOpenSideBarClick}
                edge="start"
                className={clsx(classes.menuButton, sideBarOpen && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography display="flex" variant="h6" noWrap>
                    {pageTitle}
                </Typography>
               
            </Toolbar>
        </AppBar>
    )
};
export { TopBar };