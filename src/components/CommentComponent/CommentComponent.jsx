import React, { useEffect, useState } from 'react'
import "./CommentComponent.css"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { MdOutlineCancel } from "react-icons/md";
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommentComponent = (props) => {
  const {user} = useSelector(state => state.user);
  const [showComments, setShowComments] = useState([]);
  const { _id, setIsCommentVisible } = props;

  useEffect(() => {
    let fatchComments = async () => {
      try {
        const res = await axios.get(`/tweet/get/all/comments/${_id}`);
        console.log(res.data.result)
        setShowComments(res.data.result);
      } catch (error) {
        console.log(error.response.data.messege)
      }
    }
    fatchComments();
  }, [])


  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
        const res = await axios.post('tweet/create/comment' , )
    } catch (error) {
      
    }
  }
  return (
    <div className='comment-component-container'>
      {/* <div className="cancel-btn">
        <MdOutlineCancel onClick={() => props.setIsCommentVisible(false)} className='icon'/>
      </div> */}
      <div className="author">
        <img width='30px' src={user?.imageUrl} alt="user-profile-image" />
        <strong>Banti Singh</strong>
      </div>
      <form onSubmit={onSubmitHandle} className="comment-actions">
        <input type="text" required placeholder='Type your commnt here!' />
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