import React, { useState, useEffect } from 'react';
import './sidebar.scss';
import logo from '../../../LoginAssests/logo.jpeg';
import { IoMdSpeedometer } from "react-icons/io";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";


const SideBar = () =>{
      const handleLogout = async () => {
            try {
                  const response = await fetch('http://localhost:5000/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'  
                  });
            
                  if (response.ok) {
                    localStorage.removeItem('username');  
                  //   setMessage('Logged out successfully');
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
                        <li className='listItem'>
                              <a href='/dashboard' className='menuLink flex'>
                              <IoMdSpeedometer className='icon'/>
                              <span className='smallText'>
                                    Dash board
                              </span>
                              </a>
                        </li>

                        <li className='listItem'>
                              <a href='' className='menuLink flex'>
                              <RiDeleteBin3Line className='icon'/>
                              <span className='smallText'>
                                    Bin levels
                              </span>
                              </a>
                        </li>

                        <li className='listItem'>
                              <a href='#' className='menuLink flex'>
                              <MdOutlineAccessTime className='icon'/>
                              <span className='smallText'>
                                    Times
                              </span>
                              </a>
                        </li>

                        <li className='listItem'>
                              <a href='#' className='menuLink flex'>
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
                              <li className='listItem'>
                              <a href='/editProfile' className='menuLink flex'>
                              <FaUser className='icon'/>
                              <span className='smallText'>
                                    Account
                              </span>
                              </a>
                              </li>

                              <li className='listItem'>
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