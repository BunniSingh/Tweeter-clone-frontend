import React, { useRef, useState } from 'react'
import './LoginPage.css';

import img from '../../assets/twitter-logo.png';
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/slices/userSlice';

const LoginPage = () => {
    const [toogle, setToogle] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const userNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if(toogle){
            //Rigester
            try {
                let firstName = fNameRef.current.value.trim();
                let lastName = lNameRef.current.value.trim();
                let userName = userNameRef.current.value.trim();
                let email = emailRef.current.value.trim();
                let password = passwordRef.current.value.trim();
                const obj = {firstName, lastName, userName, email , password}

                let responce = await axios.post('/user/register', obj, {
                    headers:{
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });

                if(responce.data.success){
                    toast.success(responce.data.message);
                    setToogle(!toogle);
                }

            } catch (error) {
                // toast.error(error.responce.data.message)
                console.log(error.message)
            }

        }else{
            // User Login
            try {
                let email = emailRef.current.value.trim();
                let password = passwordRef.current.value.trim();
                const obj = {email , password}
                let responce = await axios.post('/user/login', obj,{
                    headers:{
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
                // console.log(responce.data.user)
                if(responce.data.success){
                    toast.success(responce.data.message);
                    dispatch(setUserDetails(responce.data.user));
                    navigate('/')
                }

            } catch (error) {
                // toast.error(error.responce.data.message)
                console.log(error.message)
            }
        }
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
                                <input ref={fNameRef} type="text" placeholder='First Name' required/>
                                <input ref={lNameRef} type="text" placeholder='Last Name' />
                            </div>
                        <input ref={userNameRef} type="text" placeholder='Username' required/>
                       </>}
                        <input ref={emailRef} type="email" placeholder='Email' required/>
                        <input ref={passwordRef} type="password" placeholder='Password' required/>
                        <button type="submit">{toogle ? "Register" : "Login"}</button>
                    </form>
                    <p className='switch-form'>
                        {toogle ?
                            <>Already have an account?<span onClick={() => setToogle(!toogle)}>Login</span></> 
                            : 
                            <>Dont't have an account?<span onClick={() => setToogle(!toogle)}>Register</span></>}
                    </p>

                    <div className="divider">
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