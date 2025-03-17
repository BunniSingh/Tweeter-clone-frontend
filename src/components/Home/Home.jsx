import React from 'react';
import './Home.css';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import Loader from '../Loader';

const Home = () => {
  const { otherUsers } = useSelector(store => store.user);
  const { loading, error } = useGetOtherUsers();

  if(loading) <Loader/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='home-container'>
      <LeftSidebar />
      <Outlet />
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <RightSidebar otherUsers={otherUsers} />
      )}
    </div>
  );
};

export default Home;
