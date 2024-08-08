import React, { useEffect, useState } from 'react';
import SideBar from '../../Dashboard/SideBar Section/SideBar';
import './editprofile.scss';
import { PiCaretRightFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa"; 
import NavBar from '../../NavBar/navbar';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [user, setUser] = useState({ username: '', email: '', phone: '', name: '', file_path: '' });
    const [passwordData, setPasswordData] = useState({
      password: '', newPassword: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');

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
              
              // const data = response.data;
              if (response.ok) {
                  const data = await response.json();
                  setUser(data);

                  if (data.file_path) {
                    setProfilePicturePreview(`http://localhost:5000/${data.file_path}`);
                  }
              } else {
                console.error('Error fetching user data:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
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

    const handleProfilePictureChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectURL = URL.createObjectURL(file);
        setProfilePicture(file);
        setProfilePicturePreview(objectURL);

        const formData = new FormData();
        formData.append('profilePicture', file);

        const token = localStorage.getItem('token');
        try {
          const response = await fetch('http://localhost:5000/uploadprofilepicture', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
          const data = await response.json();

          if (response.ok) {
            console.log('Server response:', data); 
            setUser(prevState => ({
              ...prevState,
              profilePicture: data.file_url,
            }));
            URL.revokeObjectURL(objectURL);
          } else {
            console.error('Error:', data.error);
          }
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          URL.revokeObjectURL(objectURL);
        }
      }
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
        const response = await fetch('http://localhost:5000/update-password', {
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

  const capitalizeFirstLetter = (str) => {
    if (str && typeof str === 'string' && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return '';
  };

  return (
    <div className='editProfile'>
        <SideBar/>
        <div className="navbar">
            <NavBar/>
           </div>
      <div className='mainSetting'>
      <h3>Hey {capitalizeFirstLetter(user.name || 'User')},</h3>
      
      <div className='icons'>
        <div className='profile-container'>
          {profilePicturePreview ? (
            <img 
              src={profilePicturePreview} 
              alt="Profile" 
              className="profile-picture-preview" 
            />
          ) : (
            <FaUserCircle className='icon' />
          )}
          <label htmlFor='profilePicture' className='upload-label'>
            <input
              type='file'
              name='profilePicture'
              id='profilePicture'
              accept='image/*'
              onChange={handleProfilePictureChange}
              className='file-input'
            />
          </label>
        </div>
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
                  <button type='submit' className='save' onClick={handleSaveClick}>SAVE</button>
                </div>
              </div>
          </div>

          {/* <div className='passwordContent'>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
