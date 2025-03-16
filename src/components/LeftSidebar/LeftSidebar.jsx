import React from 'react'
import './LeftSidebar.css'
import { FaXTwitter } from "react-icons/fa6";
import { CiUser, CiTwitter,CiCircleMore   } from "react-icons/ci"
import { IoMdHome, IoIosSearch, IoMdNotifications, IoIosMore  } from "react-icons/io";
import { IoListCircleOutline } from "react-icons/io5"
import { MdOutlineForwardToInbox } from "react-icons/md";
import { Link } from 'react-router-dom';


const LeftSidebar = () => {
    let gmail = 'bantikumarsingh@gmail.com';
  return (
    <div className='left-sidebar-container'>
            <div className='sidebar-top'>
                <FaXTwitter className='twitter-logo'/>
            </div>
        <div className='left-sidebar'>
            <div className='sidebar-middle'>
                <Link to={'/'} className='sub-body'>
                    <IoMdHome className='icon'/>
                    <span>Home</span>
                </Link >
                <div className='sub-body'>
                    <IoIosSearch className='icon'/>
                    <span>Search</span>
                </div>
                <div className='sub-body'>
                    <IoMdNotifications className='icon'/>
                    <span>Notifications</span>
                </div>
                <div className='sub-body'>
                    <MdOutlineForwardToInbox className='icon' />
                    <span>Message</span>
                </div>
                <div className='sub-body'>
                    <IoListCircleOutline   className='icon' />
                    <span>Lists</span>
                </div>
                <div className='sub-body'>
                    <CiTwitter  className='icon' />
                    <span>Premium</span>
                </div>
                <Link to={"/profile"} className='sub-body'>
                    <CiUser  className='icon' />
                    <span>Profile</span>
                </Link>
                <div className='sub-body'>
                    <CiCircleMore  className='icon' />
                    <span>More..</span>
                </div>
                <div className='sub-body-btn'>
                    <button>Post</button>
                </div>
                
            </div>
            <div className='sidebar-bottom'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Profile-image" />
                <div className='buttom-sub'>
                    <p>Bunny Singh</p>
                    <p>@{gmail.split('@')[0]}</p>
                </div>
                <IoIosMore className='icon'/>
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar