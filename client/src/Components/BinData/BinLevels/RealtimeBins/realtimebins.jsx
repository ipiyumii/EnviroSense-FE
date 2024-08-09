import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './realtimebins.scss'; 

const RealtimeBins = ({binData}) => {
    // const fillPercentage = binData.level / 100;

    const fillRectRef = useRef(null);
    const [prevFillPercentage, setPrevFillPercentage] = useState(binData.level / 100);

    useEffect(() => {
        const fillPercentage = binData.level / 100;

        anime({
            targets: fillRectRef.current,
            y: 480 - (380 * fillPercentage),
            height: (380 * fillPercentage),
            easing: 'easeOutElastic(1, .5)', 
            duration: 3000, 
        });

        setPrevFillPercentage(fillPercentage);
    }, [binData.level]);

    return (

        <div className='bins'>
        <div className="range__wrapper">
            <input className="range__input" type="range" min="0" max="100" value={binData.level} readOnly />
            <svg className="bin-svg" width="300px" height="380px" viewBox="0 0 300 380" style={{ border: 'none' }}>
                
                <rect x="0" y="0" width="300" height="380" fill="hsla(0, 0%, 18%, 0.7)" stroke="none"  />

                  {/* {Array.from({ length: 12 }).map((_, index) => (
                        <line
                            key={index}
                            x1="290"
                            y1={480 - (index * 48)}
                            x2="320"
                            y2={480 - (index * 48)}
                            stroke="hsla(0, 0%, 80%, 0.7)"
                            strokeWidth="3"
                            strokeDasharray="4,2"
                        />
                    ))} */}

                        <rect 
                        className="bin-fill" 
                        ref={fillRectRef}
                        x="0" 
                        y={380 - (380 * prevFillPercentage)} 
                        width="300" 
                        height={(380 * prevFillPercentage)} 
                        fill="hsla(120, 60%, 40%, 0.4)"
                        stroke="none" 
                    />

                 
            </svg>
            <div className="range__value range__value--top">
                <span>{100 - binData.level}</span>
            </div>
            <div className="range__value range__value--bottom">
                <span>{binData.level}</span>
            </div>
        </div>
        <div className="bin-info">
            <p>{binData.bin_no}</p>
        </div>
    </div>

   
    );

};
export default RealtimeBins;
