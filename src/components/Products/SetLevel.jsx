import React, { useState, useEffect } from 'react';

const SetLevel = (props) => {

    const [DifficultyLevel, setDifficultyLevel] = useState();
    const [LelveBar, setLelveBar] = useState();

    useEffect(() => {
        if(props.level === 'easy'){
            setDifficultyLevel("簡単");
            
            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-easy_color"><span>easy</span></div>
                </div>
            );
        }else if(props.level === 'little easy'){
            setDifficultyLevel("少し簡単");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-easy_color"><span>little easy</span></div>
                    <div className="s-text-level s-little-easy_color"></div>
                </div>
            );
        }else if(props.level === 'normal'){
            setDifficultyLevel("普通");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-normal_color"><span>normal</span></div>
                    <div className="s-text-level s-normal_color"></div>
                    <div className="s-text-level s-normal_color"></div>
                </div>
            );
        }else if(props.level === 'little difficult'){
            setDifficultyLevel("少し難しい");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-diff_color"><span>little-diff</span></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                </div>
            );
        }else if(props.level === 'difficult'){
            setDifficultyLevel("難しい");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-diff_color"><span>difficult</span></div>
                    <div className="s-text-level s-diff_color"></div>
                    <div className="s-text-level s-diff_color"></div>
                    <div className="s-text-level s-diff_color"></div>
                    <div className="s-text-level s-diff_color"></div>
                </div>
            );
        }
    }, []);

    return(
        <>
            <div>着こなしやすさ ： {DifficultyLevel}</div>
            {LelveBar}
        </>
    )
};

export default SetLevel;