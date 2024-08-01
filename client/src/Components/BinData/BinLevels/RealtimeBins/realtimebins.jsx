import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './realtimebins.scss'; 

const RealtimeBins = ({binData}) => {
    const fillPercentage = binData.level;
    return (
        <div className='bins'>
            <div className="range__wrapper">
            <input className="range__input" type="range" min="0" max="100" value={binData.level} readOnly />
            <svg className="bin-svg" width="320px" height="480px" viewBox="0 0 320 480">
                {/* Whole bin */}
                <rect x="0" y="0" width="320" height="480" fill="#ddd" stroke="#000" strokeWidth="2" />
                {/* Fill level */}
                <rect x="0" y={480 - (480 * fillPercentage / 100)} width="320" height={(480 * fillPercentage / 100)} fill="#4caf50" />
            </svg>
            <div className="range__value range__value--top">
                <span>{100 - binData.level}</span>
            </div>
            <div className="range__value range__value--bottom">
                <span>{binData.level}</span>
            </div>
        </div>
        <div className="bin-info">
                <p>Bin No: {binData.bin_no}</p>
                <p>Last Updated: {new Date(binData.timestamp * 1000).toLocaleString()}</p>
            </div>
        </div>
    );

};
export default RealtimeBins;
