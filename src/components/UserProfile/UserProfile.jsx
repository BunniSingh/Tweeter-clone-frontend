import React from 'react';
import "./UserProfile.css";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoArrowBack, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import useGetUserProfile from '../../hooks/useGetUserProfile';
import Loader from '../Loader';




const UserProfile = () => {
    const { profile } = useSelector(store => store.user);
    const {id} = useParams();
    const { loading, error } = useGetUserProfile(id);

    if (loading) return <Loader/>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='user-profile-container'>
            <div className="top">
                <Link to={'/'}><IoArrowBack className='icon' /></Link>
                <div>
                    <p className='name'>{profile?.firstName} {profile?.lastName}</p>
                    <p>0 posts</p>
                </div>
            </div>

            <div className="middle">
                <div className="middle-first">
                    <img src="https://pbs.twimg.com/profile_banners/44196397/1739948056/1080x360" alt="cover-photo" />
                </div>

                <div className="middle-second">
                    <div className="mid-sub1">
                        <div className="profile-img">
                            <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="profile-image" />
                        </div>
                        <button>Edit profile</button>
                    </div>
                    <div className="mid-sub2">
                        <p className='name'>{profile?.firstName} {profile?.lastName}</p>
                        <p>@{profile?.email?.split('@')[0]}</p>
                    </div>
                    <p className='bio'>
                        Former Cricketer - @bcci, @mipaltan, @Chargershome | An Artist, as spin bowling is an art | Broadcaster @jiocinema| Employed with @BPCLIMITED
                    </p>
                    <div className="mid-sub3">
                        <div>
                            <IoLocationOutline className='icon'/>
                            <span>New Delhi, India</span>
                        </div>
                        <div>
                            <IoCalendarOutline className='icon'/>
                            <span>Joined September 2024</span>
                        </div>
                    </div>
                    <div className="mid-sub4">
                        <div>
                            <span>16</span>
                            <span>Following</span>
                        </div>
                        <div>
                            <span>1k</span>
                            <span>Followers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
