import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Description = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Create AI Images
      </motion.h1>
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Transform your ideas into stunning visuals with our AI-powered image generation tool.
      </motion.p>
      
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-6xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.img 
          src={assets.sample_img_1} 
          alt="AI Generated Sample"
          className="w-80 xl:w-96 rounded-lg shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
        />
        <motion.div 
          className="flex flex-col text-center md:text-left max-w-md lg:max-w-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Introducing the AI-Powered text to Image Generator
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Our AI-powered text to image generator is designed to transform your text prompts into stunning images in seconds. Whether you're a designer, marketer, or just looking to create unique visuals, our tool makes it easy to bring your ideas to life.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Description