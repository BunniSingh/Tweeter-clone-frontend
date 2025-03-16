import React, { useState } from 'react'
import './CreatePost.css'

import { CiImageOn } from "react-icons/ci";
import { MdEmojiEmotions, MdLocationOn, MdOutlineGifBox } from "react-icons/md"

const CreatePost = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className='create-post-container'>
        <div className="create-post-sub1">
            <div className="one" onClick={() => setToggle(!toggle)}>
                <p 
                className={!toggle  ? "active" : ""}>For you</p>
            </div>
            <div className="two" onClick={() => setToggle(!toggle)}>
                <p
                className={toggle ? "active" : ""}
                >Following</p>
            </div>
        </div>

        <div className="create-post-sub2">
            <div className='sub2-img'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Profile-image" />
            </div>
            <div className='sub2-items'>
                <input type="text" placeholder="What's happening?" />
                <div className="sub2-icons">
                    <div className="icons">
                        <CiImageOn className='icon' title='Media'/>
                        <MdOutlineGifBox className='icon' title='GIF'/>
                        <MdEmojiEmotions className='icon' title='Emojis'/>
                        <MdLocationOn  className='icon' title='Location'/>

                    </div>
                    <button>Post</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default CreatePost