import './App.css';
import React,{useState,useEffect} from 'react';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import Editprofile from './Components/User Profile/Edit Profile/Editprofile';
import './App.scss'; 
import TimesUI from './Components/Dashboard/SideBar Section/Predictions/TimesUI';

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
    path: '/timesUI',
    element: <div><TimesUI/></div>
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
