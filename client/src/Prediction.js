import React, { useState, useEffect } from 'react';

function Prediction() {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        fetch('/data')
          .then(res => res.json())
          .then(data => {
            setPredictions(data.predictions);
          });
      }, []);

  return (
    <>
        <>
      <div>
        <h2>Predictions</h2>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>{prediction}</li>
          ))}
        </ul>
      </div>
    </>
    </>
   
  );
}

export default Prediction;

