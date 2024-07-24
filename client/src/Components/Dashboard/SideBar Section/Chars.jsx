import React, { useEffect, useState } from 'react';

function ChartDisplay() {
    const [chartUrls, setChartUrls] = useState({});

    useEffect(() => {
        fetch('/path/to/chart_urls.json')
            .then(response => response.json())
            .then(data => setChartUrls(data))
            .catch(error => console.error('Error fetching chart URLs:', error));
    }, []);

    return (
        <div>
            {Object.keys(chartUrls).map((binNo) => (
                <div key={binNo}>
                    <h3>Chart for Bin {binNo}</h3>
                    <img
                        src={chartUrls[binNo]}
                        alt={`Chart for Bin ${binNo}`}
                        style={{ maxWidth: '100%' }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ChartDisplay;
