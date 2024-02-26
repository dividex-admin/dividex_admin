import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import leads from '../../assets/images/leads.svg';
import categories from '../../assets/images/categories.svg';
import dashboard from '../../assets/images/dashboard.svg';
import partners from '../../assets/images/partners.svg';
import investment from '../../assets/images/investment.png';
import userCircle from '../../assets/images/user-circle.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.sessionStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className='flex'>
      <div
        id='Main'
        className='flex flex-col items-start justify-start w-full h-full transition duration-500 ease-in-out transform'
      >
        <div className='items-center justify-start p-6 space-x-3 xl:flex'>
          <div to={'/'}>
            <img src={logo} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-start w-full px-4 pb-5 mt-6 space-y-3 border-gray-600 '>
          {/* <Link to={'/'} className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:bg-sidebarHover hover:text-black'>
            <img src={dashboard} />
            <p className='text-base leading-4 '>Dashboard</p>
          </Link> */}
          <Link to={'/investments'} className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:text-black hover:bg-sidebarHover'>
            <img src={investment} />
            <p className='text-base leading-4 '>Investment</p>
          </Link>
          <Link to={'/partners'} className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:text-black hover:bg-sidebarHover'>
            <img src={partners} />
            <p className='text-base leading-4 '>Partners</p>
          </Link>
          {/* <button className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:text-black hover:bg-sidebarHover'>
            <img src={categories} />
            <p className='text-base leading-4 '>Categories</p>
          </button> */}
          <Link to={'/leads'} className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:bg-sidebarHover hover:text-black'>
            <img src={leads} />
            <p className='text-base leading-4 '>Leads</p>
          </Link>
          <div className='h-[1px] bg-slate-500 w-full' ></div>
          <button onClick={() => logout()} className='flex items-center w-full px-4 py-2 space-x-6 text-gray-500 rounded jusitfy-start focus:outline-none focus:text-black hover:bg-sidebarHover hover:text-black'>
            <img src={userCircle} />
            <p className='text-base leading-4 '>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
