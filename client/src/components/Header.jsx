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

      <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold mt-8 text-lg">
        Generate images
        <img src={assets.star_group} alt="Stars" className="w-6 h-6" />
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