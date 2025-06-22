import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Generatebtn from './Generatebtn';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const handleNavigate = () => {
    if (user) {
      navigate('/result');
    } else {
      navigate('/buy');
    }
  };
  return (
    <motion.div 
      className="flex flex-col justify-center items-center my-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-stone-800 flex text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Best text image generator
          <motion.img 
            src={assets.star_icon} 
            alt="Star Icon" 
            className="w-5 inline-block ml-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.button>
      </motion.div>

      <motion.h1 
        className="text-4xl max-sm:text-[30px] sm:text-7xl sm:max-w-[700px] mx-auto mt-10 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Turn text to <motion.span 
          className="text-blue-600"
          initial={{ color: "#1f2937" }}
          animate={{ color: "#2563eb" }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          image
        </motion.span>, in seconds
      </motion.h1>

      <motion.p 
        className="text-gray-600 text-center mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Generate stunning images from your text prompts using our advanced AI technology.
      </motion.p>      {/* Use Generatebtn component instead of duplicate button */}
      <motion.div 
        className="mt-8" 
        onClick={handleNavigate}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="cursor-pointer">
          <Generatebtn />
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 flex flex-row items-center gap-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.img
            src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
            alt={`Sample ${index + 1}`}
            key={index}
            width={70}
            className="rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-blue-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.15, y: -5 }}
          />
        ))}
      </motion.div>
      <motion.p 
        className="text-gray-500 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
          No credit card required. Instant access to image generation.
      </motion.p>
    </motion.div>
  );
};

export default Header;