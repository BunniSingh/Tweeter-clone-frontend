import React from 'react'
import './TweetCard.css'

import { RiMoreFill, RiVerifiedBadgeFill } from "react-icons/ri";

import { FaRegComment, FaRegBookmark, FaRegHeart } from "react-icons/fa";

const TweetCard = () => {
  return (
    <div className="tweet-card-container">
        <div className="user-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Profile-image" />
        </div>
        <div className="card-details">
            <div className="card-sub1">
                <div>
                    <span>Bunny</span>
                    <RiVerifiedBadgeFill className='icon'/>
                    <span>@bunny_</span>
                    <span>few minutes ago</span>
                </div>
                <RiMoreFill className='icon' title='More'/>
            </div>
            <p className='post-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, harum temporibus dolore illum aspernatur, neque placeat doloremque officia atque veniam alias minus ad natus vero laudantium, consectetur aliquid? Corporis, commodi!</p>
            <img className="post-img" src="https://randomwordgenerator.com/img/picture-generator/g423f6094b603ed0b039339db9baa3b25f5adb631f0cd4415c13c8ff43afec8bc3ae1846b399b07508f6df51821a7e022_640.jpg" alt="post-img" />
            <div className="actions">
                <div className='action-sub'>
                    <FaRegComment className='icon'/>
                    <span>21</span>
                </div>
                <div className='action-sub'>
                    <FaRegHeart className='icon'/>
                    <span>204</span>
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