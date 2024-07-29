import React, { useEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './navbar';
import './navbar.scss';

const NavBar = () => {
    const [profilePicturePreview, setProfilePicturePreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');  
            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Received user data:', data);

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

    const handleProfileClick = () => {
        navigate('/editProfile');
    };
    const handleNotifyClick = () => {
        navigate('/notification');
    }

    return (
        <div className='navbar'>
            <IoMdNotifications className='bellicon' onClick={handleNotifyClick}/>
            {profilePicturePreview ? (
                <img 
                    src={profilePicturePreview} 
                    alt="Profile" 
                    className="profile-picture-preview" 
                    onClick={handleProfileClick}
                />
            ) : (
                <FaCircleUser className='usericon' onClick={handleProfileClick} />
            )}
        </div>
    );
};

export default NavBar;