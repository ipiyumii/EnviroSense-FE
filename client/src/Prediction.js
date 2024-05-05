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
      <div>
        <h2>Predictions</h2>
        <ul>
          {Object.keys(predictions).map(binName => (
            <li key={binName}>
              {binName}
              <ul>
                {predictions[binName].map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Prediction;
