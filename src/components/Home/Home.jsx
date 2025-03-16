import React from 'react'
import './Home.css'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import Feed from '../Feed/Feed'
import RightSidebar from '../RightSidebar/RightSidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home-container'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar/>
    </div>
  )
}

export default Home