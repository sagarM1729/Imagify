import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
        What Our Users Say
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-10">
        See what our customers are saying about our AI-powered image generation tool.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer border border-gray-100 hover:border-blue-200"
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4 transition-transform duration-300 hover:scale-110 ring-2 ring-transparent hover:ring-blue-400"
              />
              <div>
                <h3 className="font-semibold text-lg transition-colors duration-300 hover:text-blue-600">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-4 leading-relaxed">"{testimonial.text}"</p>
            <div className="flex">
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <span 
                  key={i} 
                  className="text-yellow-400 text-lg transition-transform duration-200 hover:scale-125"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial