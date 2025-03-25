import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/slices/tweetSlice';
import "./CommentComponent.css"
import axios from 'axios';

import InputEmoji from 'react-input-emoji';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

//sweetalert and toast impotrs
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import toast from 'react-hot-toast';


const CommentComponent = (props) => {
  const { user } = useSelector(state => state.user);
  const [showComments, setShowComments] = useState([]);
  // const [isEditMode, setIsEditMode] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [commentText, setCommentText] = useState("");
  // const commetRef = useRef(null)
  const dispatch = useDispatch();
  const { _id, setIsCommentVisible } = props;

  let fatchComments = async () => {
    try {
      const res = await axios.get(`/tweet/get/all/comments/${_id}`);
      console.log(res.data.result)
      setShowComments(res.data.result);
    } catch (error) {
      console.log(error.response.data.messege)
    }
  }

  useEffect(() => {
    fatchComments();
  }, [])


  const handleSubmitClick = async (event) => {
    event.preventDefault();
    try {
      let comment = commentText.trim();
      if(!comment) return;
      if (commentId) {
        // let comment = commetRef.current.value.trim();
        const res = await axios.patch('tweet/edit/comment', { commentId, comment, tweetId: _id });
        if (res.data.success) {
          fatchComments();
          dispatch(refresh());
          toast.success("Your comment is updated successfully")
          // commetRef.current.value = "";
          // setCommentText("")
          setCommentId("");
        }
      } else {
        // let comment = commetRef.current.value.trim();
        const res = await axios.post('tweet/create/comment', { comment, tweetId: _id });
        if (res.data.success) {
          fatchComments();
          dispatch(refresh());
          toast.success("Your comment was submitted successfully")
          // commetRef.current.value = "";
        }
      }
      setCommentText("")
    } catch (error) {
      toast.error(error.response?.data?.message || "Somthing went rong");
      console.log(error)
    }
  }


  const handleEditClick = async (id) => {
    let idx = showComments.findIndex(comment => comment._id === id);
    console.log('Edit mode click:', idx)
    // commetRef.current.value = showComments[idx].comment;
    setCommentText(showComments[idx].comment)
    setCommentId(id);
  }

  const handleDeleteClick = async (id) => {

    MySwal.fire({
      title: 'Are you sure?',
      text: "You want to delete your comment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {   // make this callback async
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`tweet/delete/comment`, {
            data: {
              tweetId: _id,
              commentId: id,
            }
          });

          if (res.data.success) {
            fatchComments();
            dispatch(refresh());
            toast.success("Your comment was deleted successfully");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Somthing went rong");
          console.log(error)
        }
      }
    });

  }


  return (
    <div className='comment-component-container'>
      <div className="author">
        <img width='30px' src={user?.imageUrl} alt="user-profile-image" />
        <strong>{`${user?.firstName} ${user?.lastName}`}</strong>
      </div>
      <form onSubmit={handleSubmitClick} className="comment-actions">
        {/* <input ref={commetRef} type="text" required placeholder='Type your commnt here!' /> */}
        <InputEmoji
          value={commentText}
          onChange={setCommentText}
          placeholder="Type your commnt here!"
        />
        <div className='btn'>
          <button type='submit'>Submit</button>
          <button onClick={() => setIsCommentVisible(false)}>Cancel</button>
        </div>
      </form>

      <div className="comments">
        {
          showComments.map(comment => {
            const timeAgo = dayjs(comment?.createdAt).fromNow();
            return (
              <div key={comment?._id} className="comment">
                <div className="commented-person-image">
                  <img width='30px' src={comment?.userId?.imageUrl} alt='profile-image' />
                </div>
                <div className="commented-person-detail">
                  <div>
                    <strong>{`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}</strong>
                    <span>{timeAgo}</span>
                  </div>
                  <p>{comment?.comment}</p>
                  {
                    user?._id === comment?.userId?._id &&
                    <div className="action-btn">
                      <CiEdit onClick={() => handleEditClick(comment?._id)} className="icon" />
                      <MdDeleteSweep onClick={() => handleDeleteClick(comment?._id)} className="icon" />
                    </div>
                  }
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default CommentComponent