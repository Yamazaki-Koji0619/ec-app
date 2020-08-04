import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { getOrdersHistory } from '../redux/users/selector';
import { fetchOrdersHistory } from '../redux/users/operations';
import { OrderHistoryItem } from '../components/Products';

const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    }
}))

const OrderHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const orders = getOrdersHistory(selector);

    useEffect(() => {
        dispatch(fetchOrdersHistory())
    }, [dispatch]);

    return(
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order => <OrderHistoryItem key={order.id} order={order} />)
                )}
            </List>
        </section>
    )
}

export default OrderHistory;