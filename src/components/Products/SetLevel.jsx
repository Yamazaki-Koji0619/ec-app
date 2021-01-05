import React, { useState, useEffect } from 'react';

const SetLevel = (props) => {

    const [DifficultyLevel, setDifficultyLevel] = useState();
    const [LelveBar, setLelveBar] = useState();

    useEffect(() => {
        if(props.level === 'very_easy'){
            setDifficultyLevel("初級者向け");
            
            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-easy_color"><span>Very Easy</span></div>
                </div>
            );
        }else if(props.level === 'easy'){
            setDifficultyLevel("初級・中級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-easy_color"><span>Easy</span></div>
                    <div className="s-text-level s-little-easy_color"></div>
                </div>
            );
        }else if(props.level === 'normal'){
            setDifficultyLevel("中級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-normal_color"><span>Normal</span></div>
                    <div className="s-text-level s-normal_color"></div>
                    <div className="s-text-level s-normal_color"></div>
                </div>
            );
        }else if(props.level === 'hard'){
            setDifficultyLevel("中級・上級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-little-diff_color"><span>Hard</span></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                    <div className="s-text-level s-little-diff_color"></div>
                </div>
            );
        }else if(props.level === 'very_hard'){
            setDifficultyLevel("上級者向け");

            setLelveBar(
                <div className="s-display-flex">
                    <div className="s-text-level s-diff_color"><span>Very Hard</span></div>
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