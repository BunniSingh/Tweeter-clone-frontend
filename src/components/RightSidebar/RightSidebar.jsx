import React from 'react'
import './RightSidebar.css'

import { CiSearch } from "react-icons/ci";
import { MdMoreHoriz, MdVerified } from "react-icons/md";
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const RightSidebar = ({ otherUsers }) => {
  const {loading, error} = useGetOtherUsers()

  if(loading) return <Loader/>;
  if(error) return <p>Error: {error.message}</p>;

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

      <div className="people-profiles">
        <h3>Who to follow</h3>
        {
          otherUsers.map(user => {
            let name = user.firstName + " " + user.lastName;
            if (name.length > 8) {
              name = user.firstName + "..."
            }
            return (
              <div key={user._id} className="people-profile">
                <div className='people-profile-sub'>
                  <img src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png" alt="people-profile-image" />
                  <div>
                    <Link to={`/profile/${user?._id}`}>
                      <div className='people-info'>
                        <span>{name}</span>
                        {/* <span>{`${user.firstName} ${user.lastName}`}</span> */}
                        <MdVerified className='icon' />
                      </div>
                    </Link>
                    <p>@{user.email.split('@')[0]}</p>
                  </div>
                </div>
                <button>Follow</button>
              </div>
            )
          })
        }
        <button className='btn'>Show more</button>
      </div>

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