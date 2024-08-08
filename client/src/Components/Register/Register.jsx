import React, { useState } from 'react';
import './Register.scss';
import '../../App.css';
import video from '../../LoginAssests/video.mp4';
import logo from '../../LoginAssests/logo.jpeg';
import { Link } from 'react-router-dom';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const Register = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone, username, password }),
            });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                localStorage.setItem('username', username);
                localStorage.setItem('token', data.access_token);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('failed!');
        }
    };

    return (
        <div className='registerPage flex'>
            <div className='regcontainer flex'>
                <div className='videoDiv'>
                    <video src={video} autoPlay muted loop></video>

                    <div className='textDiv'>
                        <h2 className='title'>Enviro SenseAI</h2>
                        <p>Turning waste into wealth, one step at a time</p>
                    </div>

                    <div className='footerDiv'>
                        <span className='text'>Have an account?</span>
                        <Link to={'/'}>
                            <button className='btn'>Sign In</button>
                        </Link>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <img src={logo} alt='logo' />
                        <h3>Welcome!</h3>
                    </div>

                    <form action='/register' method='POST' onSubmit={handleSubmit} className='form grid'>
                        <div className='inputDiv'>
                            <label htmlFor='email'>Email</label>
                            <div className='input flex'>
                                <MdMarkEmailRead className='icon' />
                                <input type='email' id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='telephone'>Telephone</label>
                            <div className='input flex'>
                                <BsFillTelephoneFill className='icon' />
                                <input type='tel' id='telephone' placeholder='Enter Telephone' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                            </div>
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='username'>Username</label>
                            <div className='input flex'>
                                <FaUserShield className='icon' />
                                <input type='text' id='username' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='password'>Password</label>
                            <div className='input flex'>
                                <BsFillShieldLockFill className='icon' />
                                <input type='password' id='password' placeholder='enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                        </div>

                            <button type='submit' className='btn flex'>
                                <span>Register</span>
                                <AiOutlineSwapRight className='icon' />
                            </button>   
                            {message && <span className='showMessageReg'>{message}</span>}

                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;
