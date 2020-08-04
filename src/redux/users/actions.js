export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";

export const fetchOrdersHistoryAction = (history) => {
    return {
        type: "FETCH_ORDER_HISTORY",
        payload: history
    }
};

export const FETCH_PRODUCT_IN_CART = "FETCH_PRODUCT_IN_CART";

export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCT_IN_CART",
        payload: products
    }
};

export const FETCH_PRODUCT_IN_LIKE = "FETCH_PRODUCT_IN_LIKE";

export const fetchProductsInLikeAction = (products) => {
    return {
        type: "FETCH_PRODUCT_IN_LIKE",
        payload: products
    }
};

export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: null
    }
};