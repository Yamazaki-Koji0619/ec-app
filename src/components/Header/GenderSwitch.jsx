import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import gender from '../../assets/img/gender.png';
import man from '../../assets/img/man.png';
import woman from '../../assets/img/woman.png';

const useStyles = makeStyles({
    checBox: {
        paddingRight: "10px",
        height: "80%",
    },
    padding_around: {
        padding: "8px",
    },
});

const GenderSwitch = () => {

    const classes = useStyles();
    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return(
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            className={classes.checBox}
            >
            <ToggleButton className={classes.padding_around} value="left" aria-label="left aligned">
                <img className="h-header__img" src={gender} alt=""/>
            </ToggleButton>
            <ToggleButton className={classes.padding_around} value="center" aria-label="centered">
                <img className="h-header__img" src={man} alt=""/>
            </ToggleButton>
            <ToggleButton className={classes.padding_around} value="right" aria-label="right aligned">
                <img className="h-header__img" src={woman} alt=""/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
};

export default GenderSwitch;