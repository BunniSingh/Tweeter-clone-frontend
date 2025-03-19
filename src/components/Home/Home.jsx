import React, { useEffect } from 'react';
import './Home.css';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import Loader from '../Loader';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (user === null || user === undefined) {
    return <Loader />;
  }
  
  const { loading, error } = useGetOtherUsers();

  if(loading) <Loader/>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className='home-container'>
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
