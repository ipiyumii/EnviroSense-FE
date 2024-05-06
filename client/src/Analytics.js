import React, { useState, useEffect } from 'react';

function Analytics() {
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
      fetch('/data')
        .then(res => res.json())
        .then(data => {
          setImagePaths(data.image_paths);
        });
    }, []);

  return (
    <>
       <div>
        <div className="container mt-5">
        <div className="mt-5">
            <h2 className='header'>Weekly Analytics</h2>
            <ul>
              {imagePaths.map((imagePath, index) => (
                <li key={index}>
                  <img src={imagePath} alt={`Week ${index + 1}`} />
                </li>
              ))}
            </ul>
        </div>
        </div>
      </div>
    </> 
  );
}

export default Analytics;
