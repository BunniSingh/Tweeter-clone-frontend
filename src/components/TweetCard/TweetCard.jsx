import React, { useState } from 'react'
import './TweetCard.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/slices/tweetSlice';

//sweetalert and toast impotrs
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import toast from 'react-hot-toast';

//day.js imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


//icons imports
import { RiChatDeleteLine, RiMoreFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegComment, FaRegBookmark, FaRegHeart, FaBookmark } from "react-icons/fa";
import { updateBookmarkandRemoveBookmark } from '../../redux/slices/userSlice';

const TweetCard = (tweet) => {
    const [render, setRender] = useState(false)
    const timeAgo = dayjs(tweet.updatedAt).fromNow();
    const { user } = useSelector(store => store?.user);
    const dispatch = useDispatch();

    const { _id, firstName, lastName, imageUrl, email, userName } = tweet?.userId ?? {};
    console.log(imageUrl)
    let name = `${firstName} ${lastName}`;

    const handleLikeClick = async (id) => {
        try {
            const res = await axios.put(`/tweet/like/${id}`, {}, { withCredentials: true });
            console.log(res)
            if (res.data.success) {
                toast.success(`You ${res.data.message.split(" ")[1]} the ${firstName}'s post`);
                dispatch(refresh());
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }

    const handleBookmarkClick = async (id) => {
        try {
            const res = await axios.put(`/user/bookmark/${id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(`You ${res.data.message.split(" ")[1]} in bookmark ${firstName}'s post`);
                dispatch(updateBookmarkandRemoveBookmark(id));
                setRender(!render)
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }

    const handleDeleteClick = async (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You want to delete this post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {   // make this callback async
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/tweet/delete/${id}`, { withCredentials: true });
                    console.log(res);
                    if (res.data.success) {
                        toast.success(`Your post deleted successfully`);
                        dispatch(refresh());
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "Something went wrong!");
                    console.log(error);
                }
            }
        });
    };


    return (
        <div className="tweet-card-container">
            <div className="user-img">
                <img src={imageUrl} alt="Profile-image" />
            </div>
            <div className="card-details">
                <div className="card-sub1">
                    <div>
                        <span>{name}</span>
                        <RiVerifiedBadgeFill className='icon' />
                        <span>@{userName}</span>
                        <span>{timeAgo}</span>
                    </div>
                    <RiMoreFill className='icon' title='More' />
                </div>
                <p className='post-para'>{tweet.description}</p>
                <img className="post-img" src="https://randomwordgenerator.com/img/picture-generator/g423f6094b603ed0b039339db9baa3b25f5adb631f0cd4415c13c8ff43afec8bc3ae1846b399b07508f6df51821a7e022_640.jpg" alt="post-img" />
                <div className="actions">
                    <div className='action-sub'>
                        <FaRegComment className='icon' />
                        <span>21</span>
                    </div>
                    <div className='action-sub'>
                        <FaRegHeart onClick={() => handleLikeClick(tweet?._id)} className='icon' />
                        <span>{tweet?.like.length}</span>
                    </div>
                    <div className='action-sub' title='Bookmark this post'>
                        {
                            user.bookmarks.includes(tweet?._id) ?
                                <FaBookmark size={'32px'} onClick={() => handleBookmarkClick(tweet?._id)} className="icon" />
                                :
                                <FaRegBookmark size={'32px'} onClick={() => handleBookmarkClick(tweet?._id)} className="icon" />
                        }
                    </div>
                    {
                        user._id === _id &&
                        <div className='action-sub'>
                            <RiChatDeleteLine onClick={() => handleDeleteClick(tweet?._id)} className="icon" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TweetCard