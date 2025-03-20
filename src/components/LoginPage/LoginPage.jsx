import React, { useRef, useState } from 'react'
import './LoginPage.css';

import img from '../../assets/twitter-logo.png';
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/slices/userSlice';
import Loader from '../Loader.jsx'
import { dummyImageURL } from '../../utils/constant.js';


const LoginPage = () => {
    const [loading , setLoading] = useState(false);
    
    const [toogle, setToogle] = useState(false);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const fileInputRef = useRef(null);
    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const userNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    
    if(loading) return <Loader/>;

    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result);
          reader.readAsDataURL(file);
        } else {
          setPreview("");
        }
      };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (toogle) {
            //Rigester
            try {
                const formData = new FormData();
                formData.append("firstName", fNameRef.current.value.trim());
                formData.append("lastName", lNameRef.current.value.trim());
                formData.append("userName", userNameRef.current.value.trim());
                formData.append("email", emailRef.current.value.trim());
                formData.append("password", passwordRef.current.value.trim());
                if (fileInputRef.current.files[0]) {
                    formData.append("profileImage", fileInputRef.current.files[0]);
                } else {
                    formData.append("profileImage", dummyImageURL);
                }
                
                let response = await axios.post('/user/register', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
            
                if (response.data.success) {
                    toast.success(response.data.message);
                    setTimeout(() => setToogle(!toogle), 0);
                }
            
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong!");
                console.log(error.message);
            }finally{
                setLoading(false);
            }          

        } else {
            // User Login
            try {
                let email = emailRef.current.value.trim();
                let password = passwordRef.current.value.trim();
                const obj = { email, password }

                let responce = await axios.post('/user/login', obj, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
                
                if (responce.data.success) {
                    toast.success(responce.data.message);
                    dispatch(setUserDetails(responce.data.user));
                    navigate('/')
                }

            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error.message)
            }finally{
                setLoading(false);
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
                    {!toogle && <p className="page-login">Welcome Back!</p>}
                    <form key={toogle ? "register" : "login"} onSubmit={onFormSubmit}>
                        {toogle && <>
                            <div className="image-upload-wrapper" onClick={handleImageClick}>
                                <p className='page-signup'>Register Now</p>
                                <img
                                    src={preview || dummyImageURL}
                                    title='Upload profile image'
                                    alt="profile-preview"
                                    className="profile-image"
                                    width={'100px'}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className='div'>
                                <input ref={fNameRef} type="text" placeholder='First Name' required />
                                <input ref={lNameRef} type="text" placeholder='Last Name' />
                            </div>
                            <input ref={userNameRef} type="text" placeholder='Username' required />
                        </>}
                        <input ref={emailRef} type="email" placeholder='Email' autoComplete='username' required />
                        <input ref={passwordRef} type="password" placeholder='Password' autoComplete={toogle ? "current-password" : "new-password"} required />
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