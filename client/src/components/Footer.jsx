import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Footer = () => {
  return (    <motion.footer 
      className='bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 py-12 mt-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Main Footer Content */}
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          
          {/* Logo and Description */}
          <motion.div 
            className='md:col-span-2'
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.img 
              src={assets.logo} 
              alt="Imagify Logo" 
              className='h-12 mb-4'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p 
              className='text-gray-600 mb-6 max-w-md leading-relaxed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Transform your imagination into stunning visuals with our cutting-edge AI-powered image generation technology.
            </motion.p>
            
            {/* Social Media Icons */}
            <motion.div 
              className='flex gap-4'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { href: "https://www.facebook.com", icon: assets.facebook_icon, alt: "Facebook", color: "hover:bg-blue-600" },
                { href: "https://www.twitter.com", icon: assets.twitter_icon, alt: "Twitter", color: "hover:bg-sky-500" },
                { href: "https://www.instagram.com", icon: assets.instagram_icon, alt: "Instagram", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" }
              ].map((social, index) => (
                <motion.a 
                  key={social.alt}
                  href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group bg-gray-100 p-3 rounded-full ${social.color} hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt} 
                    className='w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert' 
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className='text-lg font-semibold mb-4 text-blue-600'>Quick Links</h3>
            <ul className='space-y-2'>
              {['Home', 'About', 'Pricing', 'Contact'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <motion.a 
                    href="#" 
                    className='text-gray-600 hover:text-blue-600 transition-colors duration-300 inline-block'
                    whileHover={{ x: 5, color: "#2563eb" }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className='text-lg font-semibold mb-4 text-blue-600'>Support</h3>
            <ul className='space-y-2'>
              {['FAQ', 'Privacy Policy', 'Terms of Service', 'Help Center'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <motion.a 
                    href="#" 
                    className='text-gray-600 hover:text-blue-600 transition-colors duration-300 inline-block'
                    whileHover={{ x: 5, color: "#2563eb" }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className='border-t border-gray-300 pt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div 
            className='flex flex-col md:flex-row justify-between items-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className='text-gray-500 text-sm mb-4 md:mb-0'>
              © 2025 Imagify. All rights reserved. Made with ❤️ for creators worldwide.
            </p>
            <motion.div 
              className='flex gap-6 text-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              {['Privacy', 'Terms', 'Cookies'].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className='text-gray-500 hover:text-blue-600 transition-colors duration-300'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                  whileHover={{ color: "#2563eb", scale: 1.05 }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer