import React, { useState } from 'react'
import './RightSidebar.css'

import { CiSearch } from "react-icons/ci";
import { MdMoreHoriz, MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateFollowandUnfollow } from '../../redux/slices/userSlice';
import { refresh } from '../../redux/slices/tweetSlice';


const RightSidebar = () => {

  const dispatch = useDispatch();
  const {loading, error} = useGetOtherUsers();
  const {following} = useSelector(store => store.user.user);
  const {otherUsers} = useSelector(store => store.user);

  const [showUser , setShowUser] = useState(otherUsers?.slice(0, 3));
  const [isShowAll , setShowAll] = useState(false);

  if(loading) return <Loader/>;
  if(error) return <p>Error: {error.message}</p>;

  const handleFollowClick = async (id) => {
    try {
      const res = await axios.put(`/user/follow/${id}`, {}, {withCredentials: true});
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(updateFollowandUnfollow(id));
        dispatch(refresh());
      }
      // console.log(res.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  const onShowMoreClick = () => {
    if(isShowAll){
      setShowUser(otherUsers?.slice(0, 3))
      setShowAll(false);
    }else{
      setShowUser(otherUsers)
      setShowAll(true);
    }
  }

  return (
    <div className='right-sidebar-container'>
      <div className="search-box">
        <CiSearch className='icon' />
        <input type="text" placeholder='Search' />
      </div>

      <div className="get-primium">
        <h3>Subscribe to Premium</h3>
        <p>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
        <button>Subscribe</button>
      </div>

      {
        otherUsers.length > 0 &&
        <div className={`people-profiles ${isShowAll ? 'expand' : ''}`}>
        <h3>Who to follow</h3>
        {
          showUser?.map(user => {
            let name = user.firstName + " " + user.lastName;
            if (name.length > 8) {
              name = user.firstName + "..."
            }
            let isFollow = following.includes(user?._id) ? "Following" : "Follow";
            return (
              <div key={user._id} className="people-profile">
                <div className='people-profile-sub'>
                  <img src={user?.imageUrl} />
                  <div>
                    <Link to={`/profile/${user?._id}`}>
                      <div className='people-info'>
                        <span>{name}</span>
                        <MdVerified className='icon' />
                      </div>
                    </Link>
                    <p>@{user.userName}</p>
                  </div>
                </div>
                <button onClick={() => handleFollowClick(user?._id)}>{isFollow}</button>
              </div>
            )
          })
        }
        <button onClick={onShowMoreClick} className='btn'>{isShowAll ? "Show less" : "Show more"}</button>
      </div>}

      <div className="footer">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Accessibility</p>
        <p>Ads info</p>
        <p><span>more</span> <MdMoreHoriz className="icon" /></p>
        <p>© 2025 X Corp.</p>
      </div>

    </div>
  )
}

export default RightSidebar