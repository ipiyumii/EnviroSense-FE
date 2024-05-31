
import React, { useEffect, useState } from 'react';
import './top.scss';
import { AiOutlineMessage } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import video from '../../../../LoginAssests/video.mp4';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Top = () => {

  const [username, setUsername] = useState('');

  useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, []);

  return (
    <div className='topSection'>
      <div className='headerSection flex'>
        <div className='title'>
          <h1>Welcome to EnviroSense!</h1>
          <p>Hello {username}, Welcome Back!</p>
        </div>

        <div className='adminDiv flex'>
          <AiOutlineMessage className='icon' />
          <FaCircleUser className='icon' />
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
