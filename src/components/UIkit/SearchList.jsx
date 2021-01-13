import React, { useState, useEffect } from 'react';

const SearchList = (props) => {

    console.log(props);
    const gender = props.gender;
    const category = props.category;
    const level = props.level;
    const price = props.price;

    console.log(gender);
    console.log(category);
    console.log(level);
    console.log(price);

    const [jaGender, setJaGender] = useState("");
    const [jaCategory, setJaCategory] = useState("");
    const [jaLevel, setJaLevel] = useState("");
    const [jaPrice, setJaPrice] = useState("");

    useEffect(() => {
        if(gender === "male"){
            setJaGender('男性')
        }else if(gender === "female"){
            setJaGender('女性')
        }else{
            setJaGender('')
        }

        if(category === "tops"){
            setJaCategory('トップス')
        }else if(category === "shirts"){
            setJaCategory('シャツ')
        }else if(category === "pants"){
            setJaCategory('パンツ')
        }else if(category === "shoes"){
            setJaCategory('シューズ')
        }else{
            setJaCategory('')
        }

        if(level === "very_easy"){
            setJaLevel('初級者')
        }else if(level === "easy"){
            setJaLevel('初級・中級者')
        }else if(level === "normal"){
            setJaLevel('中級者')
        }else if(level === "hard"){
            setJaLevel('中級・上級者')
        }else if(level === "very_hard"){
            setJaLevel('上級者')
        }else{
            setJaLevel('')
        }

        if(price === 5000){
            setJaPrice('5,000円以下')
        }else if(price === 10000){
            setJaPrice('10,000円以下')
        }else if(price === 15000){
            setJaPrice('15,000円以下')
        }else{
            setJaPrice('')
        }

    }, [gender, category, level, price])

    return(
        <div className="text_left">
            HOME {jaGender !== '' ? '>' + jaGender : ''} {jaCategory !== '' || jaLevel !== '' || jaPrice !== '' ? '>' + jaCategory + jaLevel + jaPrice : ""} 
        </div>
    )
};

export default SearchList;