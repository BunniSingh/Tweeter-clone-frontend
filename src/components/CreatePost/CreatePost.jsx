import React, { useRef, useState } from 'react'
import './CreatePost.css'

import { CiImageOn } from "react-icons/ci";
import { MdClose, MdEmojiEmotions, MdLocationOn, MdOutlineGifBox } from "react-icons/md"
import axios from 'axios';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { refresh, setAllTweets } from '../../redux/slices/tweetSlice';
import { setImagePreview } from '../../redux/slices/userSlice';

const CreatePost = () => {
    const { user, imagePreview } = useSelector(store => store.user);

    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef("");
    const descriptionRef = useRef(null);

    const dispatch = useDispatch();

    if (loading) return <Loader />;


    const handleImageChage = (e) => {
        let file = e.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            dispatch(setImagePreview(previewURL));
        }
    }


    const onSubmitHandel = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const file = imageRef.current.files[0];
            const description = descriptionRef.current.value.trim();
            const formData = new FormData();
            formData.append('postImageUrl' , file);
            formData.append('description' , description);
            const res = await axios.post("/tweet/create", formData , { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(refresh());
                dispatch(setImagePreview(null));
            }
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    const forYouClick = async () => {
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

    const follingClick = async () => {
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
                    <img src={user?.imageUrl} alt="Profile-image" />
                </div>
                <form onSubmit={onSubmitHandel} className='sub2-items'>
                    <input ref={descriptionRef} type="text" placeholder="What's happening?" required />
                    <div className="sub2-icons">
                        <div className="icons">
                            <div className='image-input'>
                                <label htmlFor="image">
                                    <CiImageOn className='icon' title='Media' />
                                </label>
                                <input
                                    ref={imageRef}
                                    type='file'
                                    id='image'
                                    style={{ display: "none" }}
                                    onChange={handleImageChage}
                                />
                            </div>
                            <MdOutlineGifBox className='icon' title='GIF' />
                            <MdEmojiEmotions className='icon' title='Emojis' />
                            <MdLocationOn className='icon' title='Location' />
                        </div>
                        <button type='submit'>Post</button>
                    </div>
                    {imagePreview &&
                        <div className='preview-imge'>
                            <img src={imagePreview} alt="image" />
                            <MdClose onClick={() => dispatch(setImagePreview(null))} className="icon"/>
                        </div>
                    }
                </form>
            </div>

        </div>
    )
}

export default CreatePost