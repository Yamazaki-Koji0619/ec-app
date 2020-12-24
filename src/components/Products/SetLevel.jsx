import React, { useState, useEffect } from 'react';

const SetLevel = (props) => {

    const [DifficultyLevel, setDifficultyLevel] = useState();
    const [LelveBar, setLelveBar] = useState();

    useEffect(() => {
        if(props.level === 'easy'){
            setDifficultyLevel("初級者向け");
            
            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-easy_color"><span>easy</span></div>
                </div>
            );
        }else if(props.level === 'little easy'){
            setDifficultyLevel("初級・中級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-easy_color"><span>little-easy</span></div>
                    <div className="s-text-level s-little-easy_color"></div>
                </div>
            );
        }else if(props.level === 'normal'){
            setDifficultyLevel("中級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-normal_color"><span>normal</span></div>
                    <div className="s-text-level s-normal_color"></div>
                    <div className="s-text-level s-normal_color"></div>
                </div>
            );
        }else if(props.level === 'little difficult'){
            setDifficultyLevel("中級・上級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-diff_color"><span>little-diff</span></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                </div>
            );
        }else if(props.level === 'difficult'){
            setDifficultyLevel("上級者向け");

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