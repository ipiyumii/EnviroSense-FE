import React from 'react';

const BinTable = ({ bins }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Bin Name/ID</th>
                    <th>Last Filled Time</th>
                    <th>Predicted Fill Time</th>
                    <th>Current Status</th>
                    <th>Fill Frequency (per day)</th>
                </tr>
            </thead>
            <tbody>
                {bins.map(bin => (
                    <tr key={bin.bin_no}>
                        <td>{bin.bin_name || bin.bin_no}</td>
                        <td>{bin.lastFilledTime}</td>
                        <td>{bin.predictedFillTime}</td>
                        <td>{bin.currentStatus}</td>
                        <td>{bin.fillFrequency}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BinTable;

