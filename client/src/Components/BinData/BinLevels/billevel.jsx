import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from "../../Dashboard/SideBar Section/SideBar";
import './binlevel.scss';
import BinAlert from "../../Alert/binAlert";
import NavBar from "../../NavBar/navbar";
import RealtimeBins from './RealtimeBins/realtimebins';

const BinLevel = () => {
    const [binData, setBinData] = useState([]);

    useEffect(() => {
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

    return(
        <div className="maincontainer" style={{ display: 'flex' }}>
            <SideBar/> 

            <div className="navbar">
            <NavBar/>
           </div>
           <div className="binlevel-body">
           <div className="alert">
                <BinAlert/>
            </div>

            <div className="realtime-bin">
            {binData.map((bin, index) => (
                <RealtimeBins key={index} binData={bin} />
            ))}

            </div>

           </div>
           
           

        </div>
       
    );
}; 
export default BinLevel;