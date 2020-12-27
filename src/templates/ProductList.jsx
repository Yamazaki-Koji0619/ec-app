import React, { useEffect } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/operations';
import { getProducts, getKeyword } from '../redux/products/selector';
import { useState } from 'react';

const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const products = getProducts(selector);
    const keyword = getKeyword(selector);

    const query = selector.router.location.search;
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?categories=/.test(query) ? query.split('?categories=')[1] : "";

    useEffect(() => {
        dispatch(fetchProducts(gender, category))
    },[query, dispatch]);

    const filters = products.filter((product) => {
        if(product.name.indexOf(keyword) > -1){
            return product
        }
    });

    return(
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {filters.map(filter => (
                    <ProductCard
                    key={filter.id} id={filter.id} name={filter.name}
                    images={filter.images} price={filter.price}    
                />
                ))}
            </div>
        </section>
    )
};

export default ProductList