import React from 'react';
import { stepsData } from '../assets/assets';

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 sm:px-10 md:px-14 lg:px-28 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>

      <p className="text-lg text-gray-600 mb-8">Transform Words Into Stunning Images</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {stepsData.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105">
            <img 
              src={item.icon} 
              alt={item.title}
              className="w-16 h-16 mb-4 transition-transform duration-300 hover:scale-110"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;