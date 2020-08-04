import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInCart } from '../redux/users/selector';
import CartListItem from '../components/Products/CartListItem'
import { GreyButton, PrimaryButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
});

const CartList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const productInCart = getProductsInCart(selector);

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    },[dispatch]);

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    },[dispatch]);

    return(
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">ショッピングカート</h2>
            <List className={classes.root}>
                {productInCart.length > 0 && (
                    productInCart.map(product => <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
                <div className="module-spacer--extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default CartList;