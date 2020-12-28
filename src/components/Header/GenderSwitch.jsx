import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import man_woman from '../../assets/img/man_woman.png';
import man from '../../assets/img/man.png';
import woman from '../../assets/img/woman.png';
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
}))

const GenderSwitch = () => {

    const classes = useStyles();
    const [alignment, setAlignment] = useState('center');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

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
            <ToggleButton className={classes.padding_around} value="left" aria-label="left aligned">
                <img className="h-header__img" src={man} alt=""/>
            </ToggleButton>
            <ToggleButton className={classes.padding_around} value="center" aria-label="centered">
                <img className="h-header__img" src={man_woman} alt=""/>
            </ToggleButton>
            <ToggleButton className={classes.padding_around} value="right" aria-label="right aligned">
                <img className="h-header__img" src={woman} alt=""/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
};

export default GenderSwitch;