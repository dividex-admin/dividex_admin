import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const Wrapper = () => {
  const navigate = useNavigate();
  if (!sessionStorage.getItem('token')) navigate('/login');
  return (
    <>
      <div className='flex h-screen'>
        <div className='w-[20%]'>
          <Sidebar />
        </div>
        <div className='w-[80%] bg-gray-200 p-7 overflow-hidden overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Wrapper