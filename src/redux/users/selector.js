import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
)

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)

export const getProductsInLike = createSelector(
    [usersSelector],
    state => state.like
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
)