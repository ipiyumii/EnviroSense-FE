import React, { useState } from 'react';
import './sidebar.scss';
import logo from '../../../LoginAssests/logo.jpeg';
import { IoMdSpeedometer } from "react-icons/io";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import RealtimeBins from '../../BinData/BinLevels/RealtimeBins/realtimebins';
import { useLocation } from 'react-router-dom';

const SideBar = () =>{
      const location = useLocation();
      const [activeItem, setActiveItem] = useState(location.pathname);


      const handleClick = (path) => {
            setActiveItem(path);
      };


      const handleLogout = async () => {
            try {
                  const response = await fetch('http://localhost:5000/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'  
                  });
            
                  if (response.ok) {
                    localStorage.removeItem('username'); 
                    localStorage.removeItem('token'); 
                    localStorage.removeItem('google_access_token');
                    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; 

                  //   document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; 

                  if (window.gapi && window.gapi.auth2) {
                        const auth2 = window.gapi.auth2.getAuthInstance();
                        auth2.signOut().then(() => {
                            console.log('Google user signed out');
                        });
                    }

                    window.location.href = '/';  
                  } else {
                    console.error('Logout failed');
                  }
                } catch (error) {
                  console.error('Logout error:', error);
                }
          };

      //     const handleProfileClick = () => {
      //       navigate('/editProfile');
      //     };

      return (
        <div className='sideBar grid'>
            <div className='logoDiv flex'>
            <img src={logo} alt='logo' />
            <h2>EnviroSense.</h2>
            </div>

            <div className='menuDiv'>
                  <h3 className='divTitle'>
                        QUICH MENU
                  </h3>

                  <ul className='menuLists grid'>
                        <li 
                        className={`listItem ${activeItem === '/dashboard' ? 'active' : ''}`} 
                        onClick={() => handleClick('/dashboard')}
                        >
                              <a href='/dashboard' className='menuLink flex'>
                              <IoMdSpeedometer className='icon'/>
                              <span className='smallText'>
                                    Dash board
                              </span>
                              </a>
                        </li>

                        <li 
                        className={`listItem ${activeItem === '/binlevel' ? 'active' : ''}`} 
                        onClick={() => handleClick('/binlevel')}
                        >
                              <a href='/binlevel' className='menuLink flex'>
                              <RiDeleteBin3Line className='icon'/>
                              <span className='smallText'>
                                    Bin levels
                              </span>
                              </a>
                        </li>

                        <li 
                        className={`listItem ${activeItem === '/times' ? 'active' : ''}`} 
                        onClick={() => handleClick('/times')}
                        >         
                              <a href='/times' className='menuLink flex'>
                              <MdOutlineAccessTime className='icon'/>
                              <span className='smallText'>
                                    Times
                              </span>
                              </a>
                        </li>

                        <li 
                        className={`listItem ${activeItem === '/wastechart' ? 'active' : ''}`} 
                        onClick={() => handleClick('/wastechart')}
                        >
                              <a href='/wastechart' className='menuLink flex'>
                              <FaChartLine className='icon'/>
                              <span className='smallText'>
                                    Charts
                              </span>
                              </a>
                        </li>
                  </ul>
                  
            </div>

            <div className='settingDiv'>
                  <h3 className='divTitle'>
                              SETTINGS
                        </h3>
                  
                        <ul className='menuLists grid'>
                        <li 
                        className={`listItem ${activeItem === '/editProfile' ? 'active' : ''}`} 
                        onClick={() => handleClick('/editProfile')}
                        >                              
                              <a href='/editProfile' className='menuLink flex'>
                              <FaUser className='icon'/>
                              <span className='smallText'>
                                    Account
                              </span>
                              </a>
                        </li>

                        <li 
                        className={`listItem ${activeItem === '/notification' ? 'active' : ''}`} 
                        onClick={() => handleClick('/notification')}
                        >
                              <a href='notification' className='menuLink flex'>
                              <IoMdNotifications className='icon'/>
                              <span className='smallText'>
                                    Notification
                              </span>
                              </a>
                        </li>

                        <li 
                        className={`listItem ${activeItem === '/logout' ? 'active' : ''}`} 
                        onClick={() => handleClick('/logout')}
                        >
                              <a href='#' className='menuLink flex' onClick={handleLogout}>
                              <FaPowerOff className='icon'/>
                              <span className='smallText'>
                                    Log out
                              </span>
                              </a>
                        </li>

                              
                        </ul>
            </div>
      </div>
      );
}
export default SideBar