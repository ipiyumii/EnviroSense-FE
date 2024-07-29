
import React, { useEffect, useState } from 'react';
import './top.scss';
import { FaCircleUser } from "react-icons/fa6";
import video from '../../../../LoginAssests/video.mp4';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from 'react-router-dom';
import { IoMdNotifications } from "react-icons/io";
import NavBar from '../../../NavBar/navbar';

const Top = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({ username: '', email: '', phone: '', name: '', file_path: '' });
  const navigate = useNavigate();

  useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      console.log('Stored Username:', storedUsername);

      if (storedUsername) {
          setUsername(storedUsername);
      }

      const fetchUserData = async () => {
        const token = localStorage.getItem('token');  
        try {
              const response = await fetch('http://localhost:5000/user', {
                  method: 'GET',
                  // credentials: 'include',
                  headers: {
                    'Authorization': `Bearer ${token}`
                }
              });
              
              // const data = response.data;
              if (response.ok) {
                  const data = await response.json();
                  console.log('Received user data:', data);
                  setUser(data);
              } else {
                console.error('Error fetching user data:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };
      fetchUserData();
  }, []);


  return (
    <div className='topSection'>
      <div className='headerSection flex'>
        <div className='title'>
          <h1>Welcome to EnviroSense!</h1>
          <p>Hello {username}, Welcome Back!</p>
        </div>

          <div className='adminDiv flex'>
            <NavBar/>
          </div>
      </div>
      
      <div className='cardSection flex'>
        <div className='rightCard flex'>
          <h1>Turning waste into wealth, one step at a time</h1>
          <p>Your hub for smart and efficient waste tracking and management</p>

          <div className='buttons flex'>
            <button className='btn'> Go to charts</button>
          </div>

          <div className='videoDiv'>
            <video src={video} autoPlay loop muted></video>
          </div>

          <div className='leftCard flex'>
            <div className='main flex'>
              <div className='calendar'>
                <h1>Calendar</h1>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
