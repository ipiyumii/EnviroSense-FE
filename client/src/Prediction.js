import React, { useState, useEffect } from 'react';

function Prediction() {
  const [predictions, setPredictions] = useState([]);
  const [anomalies, setAnomalies] = useState({});

  useEffect(() => {
    fetch('/data')
      .then(res => res.json())
      .then(data => {
        setPredictions(data.predictions);
        setAnomalies(data.anomalies);
      });
  }, []);

  return (
    <>
<div className="container mt-5">
      <div className="mt-5">
        <h2 className='header'>Collection Times &nbsp; කුණු එකතු කල යුතු වේලාවන්</h2>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Bin Name &nbsp; නම</th>
              <th>Predicted Times  &nbsp; වේලාවන්</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(predictions).map(binName => (
              <tr key={binName}>
                <td>{binName}</td>
                <td>
                  <ul>
                    {predictions[binName].map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h2 className='header'>Bin Maintenance Alerts &nbsp; බදුන් කලමණාකරනය</h2>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Bin Name &nbsp; නම</th>
              <th>Bin Changing Alerts</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(anomalies).map(binName => (
              <tr key={binName}>
                <td>{binName}</td>
                <td>
                  <ul>
                    {anomalies[binName] && anomalies[binName].map((anomaly, index) => (
                      <li key={index}>{anomaly}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </>
  );
}

export default Prediction;





