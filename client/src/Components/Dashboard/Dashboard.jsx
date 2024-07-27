import React, { useState, useEffect } from 'react';
import'./dashboard.scss';
import './SideBar Section/SideBar'
import SideBar from './SideBar Section/SideBar';
import Body from './Body Section/Body';

const Dashboard = () =>{

      return (
        <div className='container'>
          <SideBar/>
          <Body/>
      </div>

    
      );
}
export default Dashboard