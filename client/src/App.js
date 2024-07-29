import './App.css';
import React,{useState,useEffect} from 'react';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import Editprofile from './Components/User Profile/Edit Profile/Editprofile';
import './App.scss'; 
import BinCard from './Components/BinData/BinCard/bincard';
import Times from './Components/BinData/times';
import WasteChart from './Components/BinData/BinCard/Charts/wasteChart';
import BinLevel from './Components/BinData/BinLevels/billevel';
import BinAlert from './Components/Alert/binAlert';
import Notification from './Components/Notification/notification';
import {
  createBrowserRouter,
  RouterProvider
}from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div> <Login/> </div>
  },
  {
    path: '/register',
    element: <div> <Register/></div>
  },
  {
    path: '/dashboard',
    element: <div> <Dashboard/> </div>
  },
  {
    path: '/editProfile',
    element: <div><Editprofile /></div>
  },
  {
    path: '/times',
    element: <div> <Times/> </div>
  },
  {
    path: '/bincard',
    element: <div> <BinCard/> </div>
  },
  {
    path: '/wastechart',
    element: <div> <WasteChart/> </div>
  },
  {
    path: '/binlevel',
    element: <div> <BinLevel/> </div>
  },
  {
    path: '/alert',
    element: <div> <BinAlert/> </div>
  },
  {
    path: '/notification',
    element: <div> <Notification/> </div>
  },
 
])
 
function App() {
  
  return (
     <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
