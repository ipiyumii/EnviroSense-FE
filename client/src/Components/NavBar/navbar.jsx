import React, { useEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './navbar';
import './navbar.scss';

const NavBar = () => {
    const [profilePicturePreview, setProfilePicturePreview] = useState('');
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

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

                    if(data.file_path) {
                        if (data.file_path.startsWith('https://lh3.googleusercontent.com/')) {
                          setProfilePicturePreview(data.file_path);
                        }
                      } else {
                        setProfilePicturePreview(`http://localhost:5000/${data.file_path}`);
    
                      }
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        const fetchNotificationCount = async () => {
            const savedDecisions = localStorage.getItem('notifications');
            const notifications = savedDecisions ? JSON.parse(savedDecisions) : [];
            const unreadNotifications = notifications.filter(decision => !decision.read).length;
            setUnreadCount(unreadNotifications);
        };
        fetchUserData();
        fetchNotificationCount();

    }, []);

    

    const handleProfileClick = () => {
        navigate('/editProfile');
    };
    const handleNotifyClick = () => {
        navigate('/notification');
    }

    return (
        <div className='navbar'>
            {/* <IoMdNotifications className='bellicon' onClick={handleNotifyClick}/> */}
            <div className='notification-wrapper'>
                <IoMdNotifications className='bellicon' onClick={handleNotifyClick}/>
                {unreadCount > 0 && (
                    <span className="notification-count">{unreadCount}</span>
                )}
            </div>
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