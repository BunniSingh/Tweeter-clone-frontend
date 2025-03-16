import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import './Feed.css'
import TweetCard from '../TweetCard/TweetCard'

const Feed = () => {
  return (
    <div className="feed-container">
      <CreatePost/>
      <TweetCard/>
      <TweetCard/>
      <TweetCard/>
      <TweetCard/>
      <TweetCard/>
    </div>
  )
}

export default Feed