import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
        Create AI Images
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-10">
        Transform your ideas into stunning visuals with our AI-powered image generation tool.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-6xl">
        <img 
          src={assets.sample_img_1} 
          alt="AI Generated Sample"
          className="w-80 xl:w-96 rounded-lg shadow-lg"
        />
        <div className="flex flex-col text-center md:text-left max-w-md lg:max-w-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Introducing the AI-Powered text to Image Generator
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Our AI-powered text to image generator is designed to transform your text prompts into stunning images in seconds. Whether you're a designer, marketer, or just looking to create unique visuals, our tool makes it easy to bring your ideas to life.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Description