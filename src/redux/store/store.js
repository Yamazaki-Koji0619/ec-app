import {
    createStore as reduxCretateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { UserReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import thunk from 'redux-thunk';

export default function cretateStore(history) {
    return reduxCretateStore(
        combineReducers({
            router: connectRouter(history),
            users: UserReducer,
            products: ProductsReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
}