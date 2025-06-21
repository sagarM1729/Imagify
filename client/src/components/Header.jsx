import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="text-stone-800 flex text-center">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg">
          Best text image generator
          <img src={assets.star_icon} alt="Star Icon" className="w-5 inline-block ml-2" />
        </button>
      </div>

      <h1 className="text-4xl max-sm:text-[30px] sm:text-7xl sm:max-w-[700px] mx-auto mt-10 text-center">
        Turn text to <span className="text-blue-600">image</span>, in seconds
      </h1>

      <p className="text-gray-600 text-center mt-4">
        Generate stunning images from your text prompts using our advanced AI technology.
      </p>

      <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 sm:px-12 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-3 text-lg sm:text-xl overflow-hidden mt-8">
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Button content */}
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
          Generate images
        </span>
        
        <img 
          src={assets.star_group}
          alt="Stars"
          className="relative z-10 h-6 w-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
      </button>

      <div className="mt-8 flex flex-row items-center gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <img
            src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
            alt={`Sample ${index + 1}`}
            key={index}
            width={70}
            className="rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-blue-400"
          />
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4">
          No credit card required. Instant access to image generation.
      </p>
    </div>
  );
};

export default Header;