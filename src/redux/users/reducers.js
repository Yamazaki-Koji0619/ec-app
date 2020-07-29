import * as Actions from './actions';
import initialState from '../store/initialState';

export const UserReducer = (state = initialState.users, action) => {
    switch(action.type){
        case Actions.FETCH_ORDER_HISTORY:
            return{
                ...state,
                orders: [...action.payload]
            }
        case Actions.FETCH_PRODUCT_IN_CART:
            return{
                ...state,
                cart: [...action.payload]
            }
        case Actions.FETCH_PRODUCT_IN_LIKE:
            return{
                ...state,
                like: [...action.payload]
            }
        case Actions.SIGN_IN:
            return{
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return{
                ...action.payload
            }
        default:
            return state
    }
}