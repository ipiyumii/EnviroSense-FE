import React, { useState, useEffect } from 'react';

function Prediction() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data`) // Add process.env.PUBLIC_URL
    .then(res => res.json())
      .then(data => {
        setPredictions(data.predictions || []);
      });
  }, []);

  return (
    <div>
      <h2>Predictions</h2>
      {predictions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>Prediction {index + 1}: {prediction}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Prediction;

