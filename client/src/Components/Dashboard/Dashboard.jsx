import React, { useEffect } from 'react';
import'./dashboard.scss';
import './SideBar Section/SideBar'
import SideBar from './SideBar Section/SideBar';
import Body from './Body Section/Body';
import BinAlert from '../Alert/binAlert';

const Dashboard = () =>{
    useEffect(() => {
      const fetchAndStoreBinsData = async () => {
          const token = localStorage.getItem('token');

          try {
              const response = await fetch('http://localhost:5000//meta/bin', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  const binsData = await response.json();
                  localStorage.setItem('binsData', JSON.stringify(binsData));
              } else {
                  console.error('Error fetching bin data:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching bin data:', error);
          }
      };

      fetchAndStoreBinsData();
  }, []);

      return (
        <div className='container'>
            <SideBar />   
            <Body/>
            <div className="alertmsg">
              <BinAlert />
            </div>
        </div>
       
    
      );
}
export default Dashboard