import React, { useState, useEffect } from 'react';

function Analytics() {
//   const [imagePaths, setImagePaths] = useState([]);

//   useEffect(() => {
//     fetch("/data")
//       .then((res) => res.json())
//       .then((data) => {
//         setImagePaths(data.image_paths);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

  return (
    <div>
      <h2>Analytics</h2>
      {/* <div>
        {imagePaths.map((path, index) => (
          <img key={index} src={path} alt={`Week ${index + 1}`} />
        ))}
      </div> */}
    </div>
  );
}

export default Analytics;
