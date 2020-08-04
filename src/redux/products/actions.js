export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProductAction = (products) => {
    return{
        type: 'FETCH_PRODUCTS',
        payload: products
    }
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
    return{
        type: 'FETCH_PRODUCTS',
        payload: products
    }
};

export const FETCH_KEYWORD = "FETCH_KEYWORD";
export const fetchKeywordAction = (keyword) => {
    return{
        type: 'FETCH_KEYWORD',
        payload: keyword
    }
};