import React from 'react'
import { testimonialsData } from '../assets/assets'
import { motion } from "motion/react"

const Testimonial = () => {
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
        What Our Users Say
      </motion.h1>
      <motion.p 
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        See what our customers are saying about our AI-powered image generation tool.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}            whileHover={{ 
              scale: 1.05, 
              y: -10, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div 
              className="flex items-center mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
            >
              <motion.img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4 ring-2 ring-transparent"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <div>
                <motion.h3 
                  className="font-semibold text-lg"
                  whileHover={{ color: "#2563eb" }}
                >
                  {testimonial.name}
                </motion.h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
            <motion.p 
              className="text-gray-600 italic mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            >
              "{testimonial.text}"
            </motion.p>
            <motion.div 
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            >
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <motion.span 
                  key={i} 
                  className="text-yellow-400 text-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 + i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Testimonial