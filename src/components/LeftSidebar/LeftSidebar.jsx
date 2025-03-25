import React from 'react'
import './LeftSidebar.css'
import { FaXTwitter } from "react-icons/fa6";
import { CiUser, CiTwitter, CiCircleMore } from "react-icons/ci"
import { IoMdHome, IoIosSearch, IoMdNotifications, IoMdLogOut } from "react-icons/io";
import { IoListCircleOutline, IoBookmark  } from "react-icons/io5"
import { MdOutlineForwardToInbox } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setAllTweets } from '../../redux/slices/tweetSlice';
import { getMyProfile, setOtherUser, setUserDetails } from '../../redux/slices/userSlice';
import axios from 'axios';
import useGetMyTweets from '../../hooks/useGetMyTweets';
const MySwal = withReactContent(Swal);

const LeftSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.user);
    let email = user?.email.split('@')[0];
    let name = `${user?.firstName} ${user?.lastName}`;

    const onLogoutClick = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.get("user/logout", { withCredentials: true });
                    console.log(res);
                    if (res.data.success) {
                        dispatch(setAllTweets(null));
                        dispatch(setOtherUser(null));
                        dispatch(setUserDetails(null));
                        dispatch(getMyProfile(null));
                        navigate('/login');
                    }
                    return;
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        });
    }

    const handleBookmarkClick = async () => {
        try {
            const res = await axios.get("tweet/getbookmarktweets", { withCredentials: true });
            console.log(res);
            if (res.data.success) {
                dispatch(setAllTweets(res.data.result));
            }
            return;
        } catch (error) {
            console.log("Error:", error.response.message);
        }
    }

    const handleHomeClick = async () => {
        try {
            const res = await axios.get("tweet/getalltweets", { withCredentials: true });
            console.log(res);
            if (res.data.success) {
                dispatch(setAllTweets(res.data.result));
            }
            return;
        } catch (error) {
            console.log("Error:", error.response.message);
        }
    }

    return (
        <div className='left-sidebar-container'>
            <div className='sidebar-top'>
                <FaXTwitter className='twitter-logo' />
            </div>
            <div className='left-sidebar'>
                <div className='sidebar-middle'>
                    <Link onClick={handleHomeClick} to={'/'} className='sub-body'>
                        <IoMdHome className='icon' />
                        <span>Home</span>
                    </Link >
                    <div className='sub-body'>
                        <IoIosSearch className='icon' />
                        <span>Search</span>
                    </div>
                    {/* <div className='sub-body'>
                        <IoMdNotifications className='icon' />
                        <span>Notifications</span>
                    </div> */}
                    {/* <div className='sub-body'>
                        <MdOutlineForwardToInbox size={'20px'} className='icon' />
                        <span>Message</span>
                    </div> */}
                    <Link onClick={handleBookmarkClick} className='sub-body'>
                        <IoBookmark size={'20px'} className='icon' />
                        <span>Bookmark</span>
                    </Link>
                    {/* <div className='sub-body'>
                        <CiTwitter className='icon' />
                        <span>Premium</span>
                    </div> */}
                    <Link to={`/profile/${user?._id}`} className='sub-body'>
                        <CiUser className='icon' />
                        <span>Profile</span>
                    </Link>
                    <div className='sub-body'>
                        <CiCircleMore className='icon' />
                        <span>More..</span>
                    </div>
                    <Link onClick={onLogoutClick} className='sub-body'>
                        <IoMdLogOut className='icon' />
                        <span>Logout</span>
                    </Link>
                    <div className='sub-body-btn'>
                        <button>Post</button>
                    </div>

                </div>
                <div className='sidebar-bottom'>
                    <img src={user?.imageUrl} alt="Profile-image" />
                    <div className='buttom-sub'>
                        <p>{name.length > 12 ? `${name.slice(0, 8)}...` : name}</p>
                        <p>@{email.length > 8 ? `${email.slice(0, 8)}...` : email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar