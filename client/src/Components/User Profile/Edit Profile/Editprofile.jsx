

import React, { useEffect, useState } from 'react';
import SideBar from '../../Dashboard/SideBar Section/SideBar';
import './editprofile.scss';
import { PiCaretRightFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { CgArrowLongRight } from "react-icons/cg";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa"; 

const Editprofile = () => {
    // const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [user, setUser] = useState({ username: '', email: '', phone: '', name: '' });
    const [passwordData, setPasswordData] = useState({
      password: '', newPassword: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    

    // const togglePersonalInfoVisibility = () => {
    //     setIsPersonalInfoVisible(!isPersonalInfoVisible);
    // };


    useEffect(() => {
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
              const data = await response.json();
              // const data = response.data;
              if (!data.error) {
                  setUser(data);
                  console.log(user);
              } else {
                  console.error(data.error);
                  setMessage('Error fetching user data');
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
              setMessage('Error fetching user data');
          }
      };
      fetchUserData();
  }, []);

    const handleSaveClick = async (e) => {
      e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/updateuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                console.log('User data saved successfully');
                setMessage('data saved successfully');
                setErrorMessage('');
                setIsEditable(false);

                 // Update localStorage with new token
                const authHeader = response.headers.get('Authorization');
                if (authHeader){
                  const newToken = authHeader.split(' ')[1];
                  localStorage.setItem('token', newToken);
                }
            } else {
                console.error('Error:', data.message);
                setErrorMessage(data.message);
                setIsEditable(true);
                // setMessage('Error saving user data');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error saving user data');
            // setIsEditable(true);
        }
      // setIsEditable(!isEditable);
  };

  const handleEditClick = () => {
    setIsEditable(true);
    setMessage(''); 
    setErrorMessage(''); 
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrorMessage("New password and confirm password do not match");
      return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/updatepwd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(passwordData),
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Password updated successfully');
            setPasswordMessage('Password updated successfully');
            setPasswordErrorMessage('');
        } else {
            console.error('Error:', data.message);
            if (response.status === 400) {
              setPasswordErrorMessage(data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        setPasswordMessage('Error updating password');
    }
  };


  return (
    <div className='editProfile'>
      <SideBar />      
      
      <div className='mainSetting'>
      <div className='mainheader'>
        <h1>MY ACCOUNT  </h1>  
      </div>
        <div className='icons'>
          <FaUserCircle className='icon' />
        </div>
        <div className='content'>
          <div className='accountSettings'>
            {/* <div className='mainHead1' onClick={togglePersonalInfoVisibility} style={{ cursor: 'pointer' }}> */}
            <div className='mainHead1'>
              {/* <FaUser /> */}
              Personal Information
              <PiCaretRightFill  />
            </div>
            {/* {isPersonalInfoVisible && ( */}
            <div className='form'>
              <div>
                <button className='edit' onClick={handleEditClick}>Edit</button>
              </div>
              <div className='form-group'>
                  <label htmlFor='name'>  <FaUser /> Name <span></span></label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={user.name}
                      readOnly={!isEditable}
                      onChange={handleChange}
                      className={isEditable ? 'editable' : ''}
                    />
                </div>
                <div className='form-group'>
                  <label htmlFor='username'>  <FaUser /> User Name <span></span></label>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      value={user.username}
                      readOnly={!isEditable}
                      onChange={handleChange}
                      className={isEditable ? 'editable' : ''}
                    />
                    {/* <p>username has already taken!</p> */}
                    {errorMessage && <p className='error-msg'>{errorMessage}</p>}
                </div>
                <div className='form-group'>
                  <label htmlFor='email'> <MdMarkEmailRead/> Email <span></span></label>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      value={user.email}
                      readOnly={!isEditable}
                      onChange={handleChange}
                      className={isEditable ? 'editable' : ''}
                    />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'> <BsFillTelephoneFill/> Phone/Mobile <span></span></label>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    value={user.phone}
                    readOnly={!isEditable}
                    onChange={handleChange}
                    className={isEditable ? 'editable' : ''}
                  />
                  {message && <p className='success-msg'>{message}</p>}
                </div>
                <div className='btns'>
                  <button type='submit' className='save' onClick={handleSaveClick}>Save</button>
                </div>
              </div>
            {/* )} */}
          </div>

          <div className='passwordContent'>
          <div className='mainHead1' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
              Password
              <PiCaretRightFill  /> 
            </div>

           
            {isPasswordVisible && (
              <div className='privacy-form'>
                <div className='subheader'>Change password</div>
                <div className='form-group'>
                  <label htmlFor='password'>Old Password: <span></span></label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    value={passwordData.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='newPassword'>New Password: <span></span></label>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name='newPassword' 
                    id='newPassword'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password: <span></span></label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name='confirmPassword' 
                    id='confirmPassword'
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    />
                </div>
                <div className='showPwd' onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash className='icon'/> : <FaEye className='icon'/>}
                </div>

                {passwordMessage && <p className='success-msg'>{passwordMessage}</p>}
                {passwordErrorMessage && <p className='error-msg'>{passwordErrorMessage}</p>}

                <div className='btns'>
                  <button type='submit' className='save' onClick={handleChangePassword}>Change Password</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
