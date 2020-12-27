import React, { useCallback, useState, useEffect } from 'react';
import { SelectBox, TextInput, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../redux/products/operations';
import ImageArea from '../components/Products/imageArea'; 
import { db } from '../firebase/index';
import SetSizeArea from '../components/Products/SetSizeArea';
import { SetLevel } from '../components/Products';

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];

    if(id !== ""){
        id = id.split('/')[1];
    }
    
    const [name, setName] = useState(""),
          [description, setDiscription] = useState(""),
          [category, setCategory] = useState(""),
          [categories, setCategories] =useState([]),
          [gender, setGender] = useState(""),
          [level, setLevel] = useState(""),
          [price, setPrice] = useState(""),
          [images, setImages] = useState([]),
          [sizes, setSizes] = useState([]);

    const InputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    const InputDiscription = useCallback((event) => {
        setDiscription(event.target.value)
    },[setDiscription]);

    const InputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice]);

    const genders = [
        {id:"all", name:"すべて"},
        {id:"male", name:"メンズ"},
        {id:"female", name:"レディース"}
    ];

    const levels = [
        {id: "easy", name: "簡単"},
        {id: "little_easy", name: "少し簡単"},
        {id: "normal", name: "普通"},
        {id: "little_difficult", name: "少し難しい"},
        {id: "difficult", name: "難しい"}
    ]

    useEffect(() => {
       if(id !== ""){
           db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    setImages(data.images);
                    setName(data.name);
                    setDiscription(data.discription);
                    setCategory(data.category);
                    setGender(data.gender);
                    setLevel(data.level);
                    setPrice(data.price);
                    setSizes(data.sizes);
                })
       } 
    },[id]);

    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push({
                        id: data.id,
                        name: data.name
                    })
                })
                setCategories(list)
            })
    },[]);

    return(
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録と編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    rows={1} value={name} type={"text"} onChange={InputName}
                />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    rows={5} value={description} type={"text"} onChange={InputDiscription}
                />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
                />
                <SelectBox
                    label={"性別"} required={true} options={genders} select={setGender} value={gender}
                />
                <SelectBox
                    label={"着こなしやすさ(合わせやすさ)"} required={true} options={levels} select={setLevel} value={level}
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    rows={1} value={price} type={"number"} onChange={InputPrice}
                />
                <div className="module-spacer--small" />
                <SetSizeArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"} onClick={() => dispatch(saveProduct(id, name, description, category, gender,　level, price, images,sizes))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit;