import React from 'react';

const SetLevel = (props) => {

    const level = props.level;

    console.log(level);

    // cosnt DisplayLevel = (level) => {
    //     if(level === 'easy'){
    //         return <div>easy</div>
    //     }else if(level === 'little easy'){
    //         return <div>little easy</div>
    //     }
    // };

    const DisplayLevel = () => {
        if(level === 'easy'){
            return <div className="s-display-flex">
                        <div>easy</div>
                   </div>
        }else if(level === 'little easy'){
            return <div className="s-display-flex">
                        <div>little easy</div>
                        <div></div>
                   </div>
        }
    }

    return(
        <>
            <div>SetLevel</div>
            {DisplayLevel()}
        </>
    )
};

export default SetLevel;