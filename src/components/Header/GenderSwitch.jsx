import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import man_woman from '../../assets/img/man_woman.png';
import man from '../../assets/img/man.png';
import woman from '../../assets/img/woman.png';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenderProducts } from '../../redux/products/operations';

const useStyles = makeStyles((theme) => ({
    checBox: {
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
        paddingRight: "10px",
        height: "80%",
    },
    padding_around: {
        padding: "8px",
    },
    notclick: {
        padding: "8px",
        pointerEvents: "none",
    }
}))

const GenderSwitch = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const query = selector.router.location.search;
    const [alignment, setAlignment] = useState('');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const selectGender = (gender) => {
        fetchGenderProducts(gender)
        if(gender == ""){
            dispatch(push("/ec-app/"))
        }else{
            dispatch(push(`/ec-app/?gender=${gender}`))
        }
    };

    useEffect(() => {
        if(!query.indexOf("?gender=male")){
            setAlignment("left")
        }else if(!query.indexOf("?gender=female")){
            setAlignment("right")
        }else{
            setAlignment("center")
        }
    }, [query]);

    useEffect(() => {
        if(alignment === "left"){
            const gender = "male"
            console.log(gender);
            fetchGenderProducts(gender)
        }else if(alignment === "right"){
            const gender = "female"
            console.log(gender);
            fetchGenderProducts(gender)
        }else{
            const gender = ""
            fetchGenderProducts(gender)
        }
    }, [alignment])

    return(
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            className={classes.checBox}
        >
            <ToggleButton className={alignment === "left" ? classes.notclick : classes.padding_around} value="left" aria-label="left aligned" onClick={() => selectGender("male")}>
                <img className="h-header__img" src={man} alt=""/>
            </ToggleButton>
            <ToggleButton className={alignment === "center" ? classes.notclick : classes.padding_around} value="center" aria-label="centered" onClick={() => selectGender("")}>
                <img className="h-header__img" src={man_woman} alt=""/>
            </ToggleButton>
            <ToggleButton className={alignment === "right" ? classes.notclick : classes.padding_around} value="right" aria-label="right aligned" onClick={() => selectGender("female")}>
                <img className="h-header__img" src={woman} alt=""/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
};

export default GenderSwitch;