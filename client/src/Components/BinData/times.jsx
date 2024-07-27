import React, { useEffect, useState } from 'react';
import SideBar from '../Dashboard/SideBar Section/SideBar';
import { FaTrashAlt } from 'react-icons/fa';
import BinCard from './BinCard/bincard';
import './times.scss';
import image1 from './bindataAssests/bin3.webp';
import image2 from './bindataAssests/bin3.webp';

const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

const Times = () =>  {
    const [bin, setBin] = useState ({bin1: [], bin2: []});

    useEffect(() => {
        const fetchPredictedTimes = async() => {
            const token = localStorage.getItem('token');  
            
            try {
                const response = await fetch('http://localhost:5000/gettimes', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(response.ok) {
                    const binData = await response.json();
                    console.log("Predicted times: ",binData);

                    setBin({
                       bin1: binData.bin1_next_day_prediction,
                        bin2: binData.bin2_next_day_prediction
                      });
                }
                else  {
                    console.error('Error fetching bin data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchPredictedTimes();

  }, []); 

  
    return (
        <div className="topmain">
                <SideBar/>
        
             <div className="row cardcontainer">

             <div className="col-md-8 col-lg-6 mb-2 mt-4">
                <BinCard 
                        imgSrc={image1} 
                        title="BIN b-01:"
                        times={bin.bin1.map(formatTime)}
                        description="place"
                        
                    />
             </div>
             <div className="col-md-6 col-lg-4 mb-4 mt-4"> 
                <BinCard 
                        imgSrc={image2} 
                        title="BIN b-02:"
                        times={bin.bin2.map(formatTime)}
                        description="place"
                    />
             </div>

           </div>

           <div className="topmenu">

           </div>
        </div>
    );
};
export default Times