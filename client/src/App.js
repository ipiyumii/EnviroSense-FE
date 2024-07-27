import './App.css';
import React,{useState,useEffect} from 'react';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import Editprofile from './Components/User Profile/Edit Profile/Editprofile';
import './App.scss'; 
import BinCard from './Components/BinData/BinCard/bincard';
import Times from './Components/BinData/times';

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


])
 
function App() {
  
  return (
     <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
