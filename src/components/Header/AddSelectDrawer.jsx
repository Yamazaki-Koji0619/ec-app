import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 256,
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}))

const AddSelectDrwer = (props) => {
    return(
        <>
            <div>AddSelectDrwer</div>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => {props.onClose(e)}}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <List></List>
            </Drawer>
        </>
    )
};

export default AddSelectDrwer;