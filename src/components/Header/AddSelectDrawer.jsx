import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
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

    const classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    const type = props.type;
    const [detailItem, setDetailItem] = useState([]);

    const selectMenu = (event, path) => {
        dispatch(push(path))
        // props.onClose(event)
    };

    const back = () => {
        props.close(!props.detail)
    }

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
            {detailItem.map(item => (
                <ListItem button key={item.id} onClick={(e) => item.func(e, item.value)}>
                    <ListItemText primary={item.label} />
                </ListItem>
            ))}
            <IconButton onClick={() => back()} >
                <ArrowBackIcon />
                <div>戻る</div>
            </IconButton>
        </>
    )
};

export default AddSelectDrwer;