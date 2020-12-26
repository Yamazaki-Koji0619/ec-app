import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { db } from '../../firebase/index';

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

    const type = props.type;
    const [detailItem, setDetailItem] = useState([]);

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    };

    useEffect(() => {
        db.collection(type).orderBy('order', 'asc').get()
        .then(snapshots => {
            const list = [];
            snapshots.forEach(snapshot => {
                const data = snapshot.data();
                list.push(
                    {func: selectMenu, label: data.name, id: data.id, value: `/ec-app/?${type}=${data.id}`},
                )
            })
            setDetailItem(() => [...list]);
            console.log(detailItem);
        })
    }, []);

    return(
        <>
            <div>AddSelectDrwer</div>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.detail}
                onClose={(e) => {props.onClose(e)}}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <List>
                    {detailItem.map(item => (
                        <ListItem button key={item.id} onClick={(e) => item.func(e, item.value)}>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
};

export default AddSelectDrwer;