import React from 'react'
import { stepsData } from '../assets/assets'


const Steps = () => {
  return (
    <div>
        <h1 className='text-3x1 sm:text-4x1 font-semibold mb-2'>How it works</h1>
       <div>
        {stepsData.map((step, index) => (
          <div key={index} className='flex items-center gap-4 mb-6'>
            <img src={step.image} alt={`Step ${index + 1}`} className='w-12 h-12 rounded' />
            <div>
              <h2 className='text-lg font-semibold'>{step.title}</h2>
              <p className='text-gray-600'>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps