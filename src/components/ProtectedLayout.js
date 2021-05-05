import React, { useState } from "react";
import { Box,  InputBase, fade, makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
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
        top: '80px',
        // left: '100px',
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
      search: {
        position: 'relative',
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginLeft: 2,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 0, 0, 5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(2em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
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
    const searchBar = () => {
        return(
            <div className={classes.search}>
                
                    <SearchIcon className={classes.searchIcon}/>
              
                    <InputBase
                    placeholder=""
                    minHeight={2}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
        )
    }
    return (
        <div className={classes.root}>
        <TopBar pageTitle={pageTitle} sideBarOpen={sideBarOpen} onOpenSideBarClick={handleSideBarOpen}/>
        <SideBar sideBarOpen={sideBarOpen} onCloseSideBarClick={handleSideBarClose} logOut={logOut} search={searchBar}/>
        <Box className={classes.content} flexDirection="row" flexWrap="wrap" justifyContent='center'>
            <Comp {...rest} />
        </Box>
        </div>
    )
};
export { ProtectedLayout };