import React, { useState } from 'react';

const SetLevel = (props) => {

    console.log(props)

    const [DifficultyLevel, setDifficultyLevel] = useState("");
    let level = "";

    const DisplayLevel = () => {

        if(props.level === 'easy'){
            level = "簡単";
            console.log(level);
            setDifficultyLevel(level);
            
            return <div className="s-display-flex">
                        <div className="s-text-level s-easy_color">easy</div>
                   </div>
        }else if(props.level === 'little easy'){
            level = "少し簡単";

            return <div className="s-display-flex">
                        <div className="s-text-level s-little-easy_color">little easy</div>
                        <div className="s-text-level s-little-easy_color"></div>
                   </div>
        }else if(props.level === 'normal'){
            level = "普通";

            return <div className="s-display-flex">
                        <div className="s-text-level s-normal_color">normal</div>
                        <div className="s-text-level s-normal_color"></div>
                        <div className="s-text-level s-normal_color"></div>
                   </div>
        }else if(props.level === 'little difficult'){
            level = "少し難しい";

            return <div className="s-display-flex">
                        <div className="s-text-level s-little-diff_color">little-diff</div>
                        <div className="s-text-level s-little-diff_color"></div>
                        <div className="s-text-level s-little-diff_color"></div>
                        <div className="s-text-level s-little-diff_color"></div>
                   </div>
        }else if(props.level === 'difficult'){
            level = "難しい";

            return <div className="s-display-flex">
                        <div className="s-text-level s-diff_color">difficult</div>
                        <div className="s-text-level s-diff_color"></div>
                        <div className="s-text-level s-diff_color"></div>
                        <div className="s-text-level s-diff_color"></div>
                        <div className="s-text-level s-diff_color"></div>
                   </div>
        }
    }

    return(
        <>
            <div>着こなしやすさ：{DifficultyLevel}</div>
            {DisplayLevel()}
        </>
    )
};

export default SetLevel;