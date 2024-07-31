import React, { useEffect, useState } from 'react';
import SideBar from '../../Dashboard/SideBar Section/SideBar';
import './wasteCharts.scss';
import NavBar from '../../NavBar/navbar';
import WasteLineChart from './wastelinechart';
import axios from 'axios';
import DonutChartComponent from './donutchart';
import BinTable from './BinTable/bintable';

const WasteChart = () => {
    const [bins, setBins] = useState([]);
    const [selectedBin, setSelectedBin] = useState('');

    useEffect(() => {
        const fetchBins = async () => {
            try {
                const response = await axios.get('http://localhost:5000/waste-data');
                if (Array.isArray(response.data)) {
                    const uniqueBins = Array.from(new Set(response.data.map(bin => bin.bin_no)))
                        .map(bin_no => response.data.find(bin => bin.bin_no === bin_no));
                    
                    setBins(uniqueBins);
                    if (uniqueBins.length > 0) {
                        setSelectedBin(uniqueBins[0].bin_no); 
                    }
                }
            } catch (error) {
                console.error('Error fetching bin data:', error);
            }
        };

        fetchBins();
    }, []);

    const handleBinChange = (event) => {
        setSelectedBin(event.target.value);
    };


    return (
        <div className='chartcontainer' style={{ display: 'flex' }}>
            <SideBar />
            <div className="navbar">
            <NavBar/>
           </div>
    
           <div className="linechart-container">
        <h3 className='title1'>Monthly Fill Frequency</h3>
        <div className="linechart">
            <WasteLineChart />
        </div>
        </div>

             <div className='donut'>
             <h3>Weekly Fill Frequency</h3>
                    <div className="bin-selector">
                        <label htmlFor="bin-select" className='drop-down'>Select Bin:</label>
                        <select id="bin-select" value={selectedBin} onChange={handleBinChange}>
                            {bins.map(bin => (
                                <option key={bin.bin_no} value={bin.bin_no}>
                                    {bin.bin_name || bin.bin_no} 
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="donutchart">
                    <DonutChartComponent binNo={selectedBin} />

                    </div>
                </div>
            

                            {/* <BinTable/> */}
        </div>
    );
};

export default WasteChart;
