import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getProductsInCart, getProductsInLike, getUserId } from '../../redux/users/selector';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/index';
import { fetchProductsInCart, fetchProductsInLike } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const HeaderMenus = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    let productsInCart = getProductsInCart(selector);
    let productsInLike = getProductsInLike(selector); 

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data()
                    const changeType = change.type;

                    switch(changeType){
                        case 'added':
                            productsInCart.push(product)
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchProductsInCart(productsInCart))
            })

        return () => unsubscribe()
    },[]);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('like')
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data()
                    const changeType = change.type;

                    switch(changeType){
                        case 'added':
                            productsInLike.push(product)
                            break;
                        case 'modified':
                            const index = productsInLike.findIndex(product => product.likeId === change.doc.id)
                            productsInLike[index] = product
                            break;
                        case 'removed':
                            productsInLike = productsInLike.filter(product => product.likeId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchProductsInLike(productsInLike))
            })

        return () => unsubscribe()
    },[]);

    return(
        <>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={() => dispatch(push('/like'))}>
                <Badge badgeContent={productsInLike.length} color="secondary">
                    <FavoriteBorderIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
};

export default HeaderMenus;