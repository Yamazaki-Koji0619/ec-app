import React, { useEffect } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/operations';
import { getProducts, getKeyword } from '../redux/products/selector';
import { SearchList } from '../components/UIkit/index';

const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const products = getProducts(selector);
    const keyword = getKeyword(selector);

    const query = selector.router.location.search; //URL取得
    const maleorfemale = !query.indexOf("?gender=") ? query.split('?gender=')[1].split('/?')[0] : ""; //性別の情報取得
    const notGenderQuery = !query.indexOf("?gender=") ? `?gender=${maleorfemale}/` : ""; //gender部分のURL取得

    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1].split('/?')[0] : "";
    const category = !query.indexOf(notGenderQuery + "?categories=") ? query.split(`${notGenderQuery}?categories=`)[1] : "";
    const level = !query.indexOf(notGenderQuery + "?level=") ? query.split(`${notGenderQuery}?level=`)[1] : "";
    const price = !query.indexOf(notGenderQuery + "?price=") ? Number(query.split(`${notGenderQuery}?price=`)[1]) : "";

    useEffect(() => {
        dispatch(fetchProducts(gender, category, level, price))
    },[query, dispatch]);

    const filters = products.filter((product) => {
        if(product.name.indexOf(keyword) > -1){
            return product
        }
    });

    return(
        <section className="c-section-wrapin">
            <SearchList gender={gender} category={category} level={level} price={price} />
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