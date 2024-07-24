// import React, { useEffect, useState } from 'react';

// const TimesUI = () => {
//     const [time, setTime] = useState({ predictions: [], decisions: {} });
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchBinData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/gettimes', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 const data = await response.json();
//                 if (!data.error) {
//                     setTime(data);
//                 } else {
//                     console.error(data.error);
//                     setMessage('Error fetching bin data');
//                 }
//             } catch (error) {
//                 console.error('Error fetching bin data:', error);
//                 setMessage('Error fetching bin data');
//             }
//         };
//         fetchBinData();
//     }, []);

//     return (
//         <div>
//             {message && <p>{message}</p>}
//             <h2>Predictions</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Prediction</th>
//                         <th>Lower Bound</th>
//                         <th>Upper Bound</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {time.predictions.map((item, index) => (
//                         <tr key={index}>
//                             <td>{new Date(item.ds).toLocaleString()}</td>
//                             <td>{item.yhat.toFixed(2)}</td>
//                             <td>{item.yhat_lower.toFixed(2)}</td>
//                             <td>{item.yhat_upper.toFixed(2)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h2>Decisions</h2>
//             <ul>
//                 {Object.entries(time.decisions).map(([binNo, decision]) => (
//                     <li key={binNo}>
//                         Bin {binNo}: {decision}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TimesUI;
