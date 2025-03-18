import React, { useRef, useState } from 'react'
import './CreatePost.css'

import { CiImageOn } from "react-icons/ci";
import { MdEmojiEmotions, MdLocationOn, MdOutlineGifBox } from "react-icons/md"
import axios from 'axios';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refresh, setAllTweets } from '../../redux/slices/tweetSlice';


const CreatePost = () => {
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const descriptionRef = useRef(null);

    const dispatch = useDispatch();

    if (loading) return <Loader />;

    const onSubmitHandel = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const description = descriptionRef.current.value.trim();
            const res = await axios.post("/tweet/create", { description }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(refresh());
            }
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    const forYouClick = async() => {
        try {
            setLoading(true)
            const res = await axios.get("/tweet/getalltweets", { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllTweets(res.data.result))
                setToggle(false)
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const follingClick = async() => {
        try {
            setLoading(true)
            const res = await axios.get("/tweet/getfollowingtweets", { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllTweets(res.data.result))
                setToggle(true);
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='create-post-container'>
            <div className="create-post-sub1">
                <div className="one" onClick={forYouClick}>
                    <p className={!toggle ? "active" : ""}>For you</p>
                </div>
                <div className="two" onClick={follingClick}>
                    <p className={toggle ? "active" : ""}>Following</p>
                </div>
            </div>

            <div className="create-post-sub2">
                <div className='sub2-img'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Profile-image" />
                </div>
                <form onSubmit={onSubmitHandel} className='sub2-items'>
                    <input ref={descriptionRef} type="text" placeholder="What's happening?" required />
                    <div className="sub2-icons">
                        <div className="icons">
                            <CiImageOn className='icon' title='Media' />
                            <MdOutlineGifBox className='icon' title='GIF' />
                            <MdEmojiEmotions className='icon' title='Emojis' />
                            <MdLocationOn className='icon' title='Location' />
                        </div>
                        <button type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreatePost