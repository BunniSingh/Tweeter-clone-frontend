import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import './Feed.css'
import TweetCard from '../TweetCard/TweetCard'
import useGetMyTweets from '../../hooks/useGetMyTweets'
import Loader from '../Loader'
import { useSelector } from 'react-redux'

const Feed = () => {

  const { loading, error } = useGetMyTweets();
  const {tweets} = useSelector(store => store.tweet);
  console.log(tweets)

  if(loading) <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="feed-container">
      <CreatePost/>
      {
        tweets?.map(tweet => <TweetCard key={tweet?._id} {...tweet}/>)
      }
     
    </div>
  )
}

export default Feed