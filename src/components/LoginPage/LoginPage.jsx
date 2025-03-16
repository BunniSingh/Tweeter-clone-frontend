import React, { useState } from 'react'
import './LoginPage.css';

import img from '../../assets/twitter-logo.png';
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
    const [toogle, setToogle] = useState(false);


    const onFormSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='login-page-container'>
            <div className="login-page">
                <div className="left">
                    <img src={img} alt="logo" />
                </div>
                <div className="right">
                    <h1>Happening now</h1>
                    <p className='page-name'>{toogle ? "Join now": "Login"}</p>
                    <form key={toogle ? "register" : "login"} onSubmit={onFormSubmit}>
                       {toogle &&  <>
                            <div className='div'>
                                <input type="text" placeholder='First Name' />
                                <input type="text" placeholder='Last Name' />
                            </div>
                        <input type="text" placeholder='Username' />
                       </>}
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='password' />
                        <button type="submit">{toogle ? "Register" : "Login"}</button>
                    </form>
                    <p className='switch-form'>
                        {toogle ?
                            <>Already have an account?<span onClick={() => setToogle(!toogle)}>Login</span></> 
                            : 
                            <>Dont't have an account?<span onClick={() => setToogle(!toogle)}>Register</span></>}
                    </p>

                    <div class="divider">
                        <span>OR</span>
                    </div>

                    <button className='google-btn'>
                        <FaGoogle className='icon' />
                        Login with google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage