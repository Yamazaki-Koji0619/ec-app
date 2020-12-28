import React, { useState, useCallback } from 'react' ;
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import portfolio from '../../assets/img/portfolio.png';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedIn } from '../../redux/users/selector';
import { push } from 'connected-react-router';
import { HeaderMenus, ClosableDrawer } from './index';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444"
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%"
    },
    iconButtons: {
        margin: "0 0 0 auto",
        display: "flex",
        alignItems: "center",
    }
});

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const isSignedIn = getSignedIn(selector);

    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key ==='Shift')){
            return;
        }
        setOpen(!open)
    },[setOpen, open]);

    return(
        <div className={classes.root}>
            <AppBar potition="fixed" className={classes.menuBar}>
                <ToolBar className={classes.toolBar}>
                    <img
                        src={portfolio} alt="portfolio" width="128px"
                        onClick={() => dispatch(push('/ec-app'))}
                    />
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </ToolBar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
};

export default Header;