import React from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext.jsx';
import { useContext } from 'react';
import Login from './Login';

const Navbar = () => {
  const { user, logout, showLogin, openLogin, closeLogin, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <motion.div 
      className="flex items-center justify-between py-4"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <motion.button 
              onClick={() => navigate('/buy')} 
              className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
                <motion.img 
                  className='w-5'
                  src={assets.credit_star}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
            </motion.button>
            <motion.p 
              className='text-gray-600 max-sm:hidden pl-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Hi, {user.name}
            </motion.p>
            <motion.div 
              className='relative group'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
                <img src={assets.profile_icon} className='w-10 drop-shadow' />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white shadow-lg rounded-md border text-sm'>
                    <li onClick={handleLogout} className='py-1 px-2 cursor-pointer hover:bg-gray-100'>Logout</li>
                </ul>
                </div>
            </motion.div>
          </div>        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <motion.p 
              onClick={() => navigate('/buy')} 
              className='cursor-pointer hover:text-blue-600 transition-colors duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pricing
            </motion.p>
            <motion.button 
              onClick={openLogin} 
              className='bg-zinc-800 text-white py-2 px-7 sm:px-10 text-sm rounded-full hover:bg-zinc-700 transition-all duration-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Login
            </motion.button>
          </div>
        )}
      </motion.div>{/* Login Modal */}
      <Login isOpen={showLogin} onClose={closeLogin} />
    </motion.div>
  );
};

export default Navbar;