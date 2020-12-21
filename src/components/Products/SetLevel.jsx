import React, { useState } from 'react';

const SetLevel = (props) => {

    const [level, setLevel] = useState('');

    console.log(level);

    const DisplayLevel = () => {
        if(props.level === 'easy'){
            setLevel('簡単');
            
            return <div className="s-display-flex">
                        <div className="s-text-level s-easy_color">easy</div>
                        <div className="s-text-level"></div>
                   </div>
        }else if(props.level === 'little easy'){
            setLevel('少し簡単');

            return <div className="s-display-flex">
                        <div className="s-text-level s-little-easy_color">little easy</div>
                        <div className="s-text-level s-little-easy_color"></div>
                   </div>
        }else if(props.level === 'normal'){
            setLevel('普通');

            return <div className="s-display-flex">
                        <div className="s-text-level s-normal_color">normal</div>
                        <div className="s-text-level s-normal_color"></div>
                        <div className="s-text-level s-normal_color"></div>
                   </div>
        }else if(props.level === 'little difficult'){
            setLevel('少し難しい');

            return <div className="s-display-flex">
                        <div className="s-text-level s-little-diff_color">little-diff</div>
                        <div className="s-text-level s-little-diff_color"></div>
                        <div className="s-text-level s-little-diff_color"></div>
                        <div className="s-text-level s-little-diff_color"></div>
                   </div>
        }else if(props.level === 'difficult'){
            setLevel('難しい');

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
            <div>着こなしやすさ：{level}</div>
            {DisplayLevel()}
        </>
    )
};

export default SetLevel;