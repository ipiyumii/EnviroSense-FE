import React, { useState } from 'react';
import './Login.scss';
import '../../App.css';
import video from '../../LoginAssests/video.mp4';
import logo from '../../LoginAssests/logo.jpeg';

import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const clientId = '967460610118-g4oul1g5umkiu6heanm2ornah4hektvu.apps.googleusercontent.com';

    // handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password }),
            });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                // localStorage.setItem('username', username);
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', data.username);
                window.location.href = '/dashboard';
            }
        }
        catch(error) {
            console.error('Error:', error);
            setMessage('failed!');
        }
    }

    const handleGoogleLogin = (response) => {
        console.log('Google login response:', response);

        fetch('http://localhost:5000/google-login', {
            method: 'POST',
            body: JSON.stringify({ token: response.credential }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => { 
                // setUsername(data.name);    
                localStorage.setItem('username', data.username);     
                console.log('Login successful:', data);
                window.location.href = '/dashboard';  
        })
        .catch(error => {
            console.error('Login error:', error);
        });
    };
    
    const onFailure = (error) => {
        console.error('Google login error:', error);
    };
    
    return (
        <GoogleOAuthProvider clientId={clientId}> 
        <div className='loginPage flex'>
            <div className='container flex'>
                <div className='videoDiv'>
                    <video src={video} autoPlay muted loop></video>

                    <div className='textDiv'>
                        <h2 className='title'>Enviro SenseAI</h2>
                        <p>Turning waste into wealth, one step at a time</p>
                    </div>

                    <div className='footerDiv'>
                        <span className='text'>Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <img src={logo} alt='logo' />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action='' onSubmit={handleLogin} className='form grid'>
                    {message && <span className='showMessage'>{message}</span>}
                        <div className='inputDiv'>
                            <label htmlFor='username'>Username</label>
                            <div className='input flex'>
                                <FaUserShield className='icon' />
                                <input type='text' id='username' placeholder='enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='password'>Password</label>
                            <div className='input flex'>
                                <BsFillShieldLockFill className='icon' />
                                <input type='password' id='password' placeholder='enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <div className='googleLog'>
                        <span className='googleLogin'>
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Sign in with Google"
                                onSuccess={handleGoogleLogin}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                // isSignedIn={true}
                                scope="profile email"
                                />
                        </span>

                        </div>
                    
                        {/* <span className='forgetPassword'>
                            Forgot your password? 
                            <Link to={'/forgtoPassword'}>
                            Click Here
                            </Link>
                        </span> */}
{/* 
                        <span className='googleLogin'>
                            Sign In with google
                        </span> */}

                        
                    </form>
                </div>
            </div>
        </div>

        </GoogleOAuthProvider>

    );
};

export default Login;

// aneballo123@
// test.autho.124@gmail.com