import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from "motion/react";

const Steps = () => {
  return (    <motion.div 
      className="flex flex-col items-center justify-center text-center py-10 px-4 sm:px-10 md:px-14 lg:px-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-3xl sm:text-4xl font-semibold mb-2"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        How it works
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-600 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Transform Words Into Stunning Images
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {stepsData.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center text-center cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src={item.icon} 
              alt={item.title}
              className="w-16 h-16 mb-4"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Steps;