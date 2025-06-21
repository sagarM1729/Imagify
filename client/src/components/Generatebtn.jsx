import React from 'react'
import { assets } from '../assets/assets'

const Generatebtn = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-800">
        Generate Your Image
      </h1>
      
      <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 sm:px-12 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-3 text-lg sm:text-xl overflow-hidden">
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Button content */}
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
          Generate Image
        </span>
        
        <img 
          src={assets.star_group}
          alt="Stars"
          className="relative z-10 h-6 w-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
      </button>
      
      <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-md">
        Click to transform your text into stunning AI-generated images
      </p>
    </div>
  )
}

export default Generatebtn