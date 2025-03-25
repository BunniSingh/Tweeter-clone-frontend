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
import { FaRegComment, FaRegBookmark, FaRegHeart, FaBookmark, FaHeart } from "react-icons/fa";
import { updateBookmarkandRemoveBookmark } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import CommentComponent from '../CommentComponent/CommentComponent';

const TweetCard = (tweet) => {
    const [render, setRender] = useState(false)
    const [isCommentVisible, setIsCommentVisible] = useState(false)
    const timeAgo = dayjs(tweet.updatedAt).fromNow();
    const { user } = useSelector(store => store?.user);
    const dispatch = useDispatch();

    const { _id, firstName, lastName, imageUrl, userName } = tweet?.userId ?? {};
    console.log(imageUrl)
    let name = `${firstName} ${lastName}`;

    const handleLikeClick = async (id) => {
        try {
            const res = await axios.put(`/tweet/like/${id}`, {}, { withCredentials: true });
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

    const handleCommentClick = () =>{
        setIsCommentVisible(!isCommentVisible);
    }

    return (
        <div className="tweet-card-container">
            <Link to={`/profile/${_id}`}>
                <div className="user-img">
                    <img src={imageUrl} alt="Profile-image" />
                </div>
            </Link>
            <div className="card-details">
                <div className="card-sub1">
                    <div>
                        <Link to={`/profile/${_id}`}>
                            <span>{name}</span>
                        </Link>
                        <RiVerifiedBadgeFill className='icon' />
                        <span>@{userName}</span>
                        <span>{timeAgo}</span>
                    </div>
                    <RiMoreFill className='icon' title='More' />
                </div>
                <p className='post-para'>{tweet.description}</p>
                {tweet?.postImageUrl != "NA" && 
                    <div className="post-img">
                        <a href={tweet?.postImageUrl} target='_blank'><img src={tweet?.postImageUrl} alt="post-img" /></a>
                    </div>
                }
                <div className="actions">
                    <div className='action-sub'>
                        <FaRegComment onClick={handleCommentClick} className='icon' />
                        <span>{tweet?.comments.length}</span>
                    </div>
                    <div className='action-sub'>
                        {
                            tweet?.like.includes(user?._id) ?
                                <FaHeart onClick={() => handleLikeClick(tweet?._id)} className='icon' />
                                :
                                <FaRegHeart onClick={() => handleLikeClick(tweet?._id)} className='icon' />
                        }
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
                {isCommentVisible &&
                    <CommentComponent
                        {...tweet}
                        setIsCommentVisible={setIsCommentVisible}
                    />
                }
            </div>
        </div>
    )
}

export default TweetCard