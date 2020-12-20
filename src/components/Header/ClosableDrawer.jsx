import React, { useCallback, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from '../UIkit/index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signOut } from '../../redux/users/operations';
import { fetchKeyword } from '../../redux/products/operations';
import { db } from '../../firebase/index';
// import { Link } from 'react-router-dom';

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


const ClosableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    },[setKeyword])

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    };

    const [filters, setFilters] = useState([
        {func: selectMenu, label: "すべて", id: 'all', value: "/ec-app/"},
        {func: selectMenu, label: "メンズ", id: 'male', value: "/ec-app/?gender=male"},
        {func: selectMenu, label: "レディース", id: 'female', value: "/ec-app/?gender=female"},
    ])

    const menus = [
        {func: selectMenu, label: "商品登録",　icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",　icon: <HistoryIcon />, id: "history", value: "/order/history"},
        {func: selectMenu, label: "プロフィール",　icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
    ];

    // const fetchMenuData = (itemType) => {
    //     db.collection(itemType).orderBy('order', 'asc').get()
    //         .then(snapshots => {
    //             const list = [];
    //             snapshots.forEach(snapshot => {
    //                 const getItem = snapshot.data();
    //                 console.log(getItem);
    //                 list.push(
    //                     {func: selectMenu, label: getItem.name, id: getItem.id, value: `/ec-app/?${itemType}=${getItem.id}`},
    //                 )
    //                 console.log(list);
    //             })
    //             setFilters(prevState => [...prevState, ...list]);
    //             console.log(filters);
    //         })
    //         console.log(filters);        
    // };

    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const category = snapshot.data();
                    list.push(
                        {func: selectMenu, label: category.name, id: category.id, value: `/ec-app/?category=${category.id}`},
                    )
                })
                setFilters(prevState => [...prevState, ...list]);
                console.log(filters);
            })
        // fetchMenuData('categories')
    },[])

    useEffect(() => {
        db.collection('season').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const season = snapshot.data();
                    list.push(
                        {func: selectMenu, label: season.name, id: season.id, value: `/ec-app/?season=${season.id}`},
                    )
                })
                setFilters(prevState => [...prevState, ...list]);
                console.log(filters);
            })
        // fetchMenuData('categories')
    },[])

    useEffect(() => {
        dispatch(fetchKeyword(keyword))
    },[keyword])

    return(
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => {props.onClose(e)}}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div onClose={(e) => props.onClose(e)}>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワード入力"} multiline={false}
                            onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                        />
                        <IconButton onClick={() => dispatch(push('/ec-app'))} >
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map((menu) => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}

export default ClosableDrawer;