import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { db } from '../../firebase/index';
import { getUserId } from '../../redux/users/selector';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    list: {
        height: 128,
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
});

const LikeListItem = (props) => {
    const classes = useStyles();
    const product = props.product;
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    const name = product.name;
    const image = product.images[0].path;
    const size = product.size;
    const price = product.price.toLocaleString();

    const removeProductFromLike = (id) => {
        db.collection('users').doc(uid).collection('like').doc(id).delete();
    }

    return(
        <ListItem className={classes.list}>
            <ListItemAvatar>
                <img className={classes.image} src={image} alt="商品画像"/>
            </ListItemAvatar>
            <div className={classes.text}>
                    <ListItemText primary={name} secondary={"サイズ：" + size} />
                    <ListItemText primary={'¥' + price} />
                </div>
            <IconButton onClick={() => removeProductFromLike(props.product.likeId)}>
                <DeleteIcon />
            </IconButton>
            <Divider />
        </ListItem>
    )
}

export default LikeListItem;