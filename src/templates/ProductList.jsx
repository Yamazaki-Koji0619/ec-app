import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/operations';
import { getProducts, getKeyword } from '../redux/products/selector';

const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const products = getProducts(selector);
    const keyword = getKeyword(selector);

    // const [category, setCategory] = useState();

    const query = selector.router.location.search; //URL取得
    const maleorfemale = "?gender=/".indexOf(query) ? query.split('?gender=')[1].split('/?')[0] : ""; //性別の情報取得
    const notGenderQuery = "?gender=/".indexOf(query) ? `?gender=${maleorfemale}` : "notgender"; //gender部分のURL取得
    console.log(maleorfemale);
    console.log(notGenderQuery);

    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    // const category = /^\?categories=/.test(query) ? query.split('?categories=')[1] : "";
    // const category = new RegExp(notGenderQuery + "/?categories=").test(query) ? query.split(notGenderQuery + '/?categories=')[1] : "";
    // const category = notGenderQuery + "/?categories=" === query ? query.split(`${notGenderQuery}/?categories=`)[1] : "";
    const category = !query.indexOf(notGenderQuery + "/?categories=") ? query.split(`${notGenderQuery}/?categories=`)[1] : "";
    const level = /^\?level=/.test(query) ? query.split('?level=')[1] : "";
    const price = /^\?price=/.test(query) ? Number(query.split('?price=')[1]) : "";

    console.log(query);
    console.log(`${notGenderQuery}/?categories=`);
    console.log(category);

    // useEffect(() => {
    //     if(query.indexOf("?gender=")){
    //         const url = new RegExp(query + /^\?categories=/);
    //         // setCategory(new RegExp(query + /^\?categories=/));
    //         // const category = /^\?categories=/.test(query) ? query.split('?categories=')[1] : "";
    //         const level = /^\?level=/.test(query) ? query.split('?level=')[1] : "";
    //         const price = /^\?price=/.test(query) ? Number(query.split('?price=')[1]) : "";
    //     }
    //     category = category.test(category) ? query.split('?categories=')[1] : "";
    // }, [])

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