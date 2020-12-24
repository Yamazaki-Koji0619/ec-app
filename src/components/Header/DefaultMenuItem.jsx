import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/users/operations';

const DefaultMenuItem = () => {

    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");

    const menus = [
        {func: selectMenu, label: "商品登録",　icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",　icon: <HistoryIcon />, id: "history", value: "/order/history"},
        {func: selectMenu, label: "プロフィール",　icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
    ];

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    },[setKeyword])

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    };

    return(
        <>
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
        </>
    )
};

export default DefaultMenuItem;