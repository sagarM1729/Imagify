import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 py-12 mt-20 border-t border-gray-200'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          
          {/* Logo and Description */}
          <div className='md:col-span-2'>
            <img 
              src={assets.logo} 
              alt="Imagify Logo" 
              className='h-12 mb-4 transition-transform duration-300 hover:scale-105'
            />
            <p className='text-gray-600 mb-6 max-w-md leading-relaxed'>
              Transform your imagination into stunning visuals with our cutting-edge AI-powered image generation technology.
            </p>
            
            {/* Social Media Icons */}
            <div className='flex gap-4'>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className='group bg-gray-100 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg'
              >
                <img 
                  src={assets.facebook_icon} 
                  alt="Facebook" 
                  className='w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert' 
                />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className='group bg-gray-100 p-3 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg'
              >
                <img 
                  src={assets.twitter_icon} 
                  alt="Twitter" 
                  className='w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert' 
                />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className='group bg-gray-100 p-3 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-lg'
              >
                <img 
                  src={assets.instagram_icon} 
                  alt="Instagram" 
                  className='w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert' 
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-blue-600'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Home</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>About</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Pricing</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-blue-600'>Support</h3>
            <ul className='space-y-2'>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>FAQ</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Privacy Policy</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Terms of Service</a></li>
              <li><a href="#" className='text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1 transform inline-block'>Help Center</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-300 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-500 text-sm mb-4 md:mb-0'>
              © 2025 Imagify. All rights reserved. Made with ❤️ for creators worldwide.
            </p>
            <div className='flex gap-6 text-sm'>
              <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'>Privacy</a>
              <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'>Terms</a>
              <a href="#" className='text-gray-500 hover:text-blue-600 transition-colors duration-300'>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer