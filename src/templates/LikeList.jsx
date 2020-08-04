import React from 'react' ;
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInLike } from '../redux/users/selector';
import { LikeListItem } from '../components/Products';
import { GreyButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
});

const LikeList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const productInLike = getProductsInLike(selector);

    const backToHome = () => {
        dispatch(push('/'))
    };

    return(
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">お気に入り</h2>
            <List className={classes.root}>
                {productInLike.length !== 0 ? (
                    productInLike.map(product => <LikeListItem product={product} />)
                ) : (
                    <div>お気に入りの商品はありません。</div>
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default LikeList;