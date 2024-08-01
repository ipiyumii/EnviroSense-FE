import React, { useEffect, useState } from 'react';
import SideBar from '../../Dashboard/SideBar Section/SideBar';
import './wasteCharts.scss';
import NavBar from '../../NavBar/navbar';
import WasteLineChart from './ChartComponents/wastelinechart';
import axios from 'axios';
import DonutChartComponent from './ChartComponents/donutchart';
import BinLevels from './ChartComponents/binlevels';

const colors = ['#333','#8884d8', '#ffc658' , '#82ca9d','#1976d2',  '#ff7300', '#d0ed57', '#a4de6c', '#c5a4d6'];

const WasteChart = () => {
    const [bins, setBins] = useState([]);
    const [selectedBin, setSelectedBin] = useState('');
    const [binData, setBinData] = useState([]);

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

        const fetchBinData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/realtime-data');
                setBinData(response.data);
                console.log('Fetched data:', response.data); 
            } catch (error) {
                console.error("Error fetching bin data", error);
            }
        };
        fetchBinData();
        const interval = setInterval(fetchBinData, 5000);
        return () => clearInterval(interval); 
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
    
           <div className="upper-container">
                <div className="linechart-container">
                    <h3 className='title1'>Monthly Fill Frequency</h3>
                        <div className="linechart">
                            <WasteLineChart />
                        </div>
                </div>
               
                <div className="realtime-card">
                {binData.map((bin, index) => (
                    <BinLevels
                    key={bin.bin_no}
                    bin={bin}
                    color={colors[index % colors.length]} 
                    />
                ))}
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
