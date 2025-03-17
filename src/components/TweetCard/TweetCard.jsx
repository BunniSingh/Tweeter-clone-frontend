import React from 'react'
import './TweetCard.css'

import { RiMoreFill, RiVerifiedBadgeFill } from "react-icons/ri";

import { FaRegComment, FaRegBookmark, FaRegHeart } from "react-icons/fa";

const TweetCard = (tweet) => {
    let {firstName, lastName , email, userName} = tweet.userId;
    // email = email.split('@')[0];
    let name = `${firstName} ${lastName}`;
  return (
    <div key={tweet?._id} className="tweet-card-container">
        <div className="user-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Profile-image" />
        </div>
        <div className="card-details">
            <div className="card-sub1">
                <div>
                    <span>{name}</span>
                    <RiVerifiedBadgeFill className='icon'/>
                    <span>@{userName}</span>
                    <span>few minutes ago</span>
                </div>
                <RiMoreFill className='icon' title='More'/>
            </div>
            <p className='post-para'>{tweet.description}</p>
            <img className="post-img" src="https://randomwordgenerator.com/img/picture-generator/g423f6094b603ed0b039339db9baa3b25f5adb631f0cd4415c13c8ff43afec8bc3ae1846b399b07508f6df51821a7e022_640.jpg" alt="post-img" />
            <div className="actions">
                <div className='action-sub'>
                    <FaRegComment className='icon'/>
                    <span>21</span>
                </div>
                <div className='action-sub'>
                    <FaRegHeart className='icon'/>
                    <span>{tweet?.like.length}</span>
                </div>
                <div className='action-sub'>
                    <FaRegBookmark className="icon"/>
                    <span>0</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TweetCard