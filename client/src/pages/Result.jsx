import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import Generatebtn from '../components/Generatebtn'

const Result = () => {
  const [image, setImage] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [hasGenerated, setHasGenerated] = useState(false)
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to generate an image!')
      return
    }
    
    setLoading(true)
    setHasGenerated(false)
    
    // Simulate API call
    setTimeout(() => {
      setImage(assets.sample_img_1) // Replace with actual API response
      setHasGenerated(true)
      setLoading(false)
      setIsImageLoaded(true)
    }, 3000)
  }

  const handleDownload = () => {
    if (!image) return
    
    const link = document.createElement('a')
    link.href = image
    link.download = 'generated-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
          {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {hasGenerated ? 'Your Generated Image' : 'AI Image Generator'}
          </h1>
          <p className="text-gray-600 text-lg">
            {hasGenerated ? 'AI-powered image generation complete!' : 'Transform your ideas into stunning images with AI'}
          </p>
        </motion.div>

        {/* Generation Interface or Result Container */}
        {!hasGenerated ? (
          /* Generation Interface */
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Describe Your Image
              </h2>
              
              {/* Prompt Input */}
              <div className="mb-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate... (e.g., 'A futuristic city at sunset with flying cars')"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none h-32 text-gray-700"
                  disabled={loading}
                />
              </div>              {/* Generate Button */}
              <div className="text-center">
                {loading ? (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 mx-auto mb-4 opacity-75">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating...
                  </div>
                ) : (
                  <div 
                    onClick={prompt.trim() ? handleGenerate : undefined}
                    className={`cursor-pointer mb-4 ${!prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Generatebtn />
                  </div>
                )}
                
                {/* Back to Home Button */}
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  ← Back to Home
                </button>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="mt-8 text-center">
                  <div className="bg-gray-100 rounded-xl p-6">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-600 font-semibold">Creating your masterpiece...</p>
                    <p className="text-gray-500 text-sm mt-2">This usually takes 10-30 seconds</p>
                  </div>
                </div>
              )}            </div>
          </motion.div>
        ) : (
          /* Result Container */
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
          {/* Image Display */}
          <div className="relative">
            {image ? (
              <div className="relative">
                <img 
                  src={image} 
                  alt="Generated AI Image" 
                  className="w-full h-auto max-h-96 object-contain bg-gray-100"
                  onLoad={() => setIsImageLoaded(true)}
                />
                {isImageLoaded && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ✓ Generated
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-gray-500">No image generated yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              {/* Download Button */}
              <button 
                onClick={handleDownload}
                disabled={!image}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={assets.download_icon} alt="Download" className="h-5 w-5" />
                Download Image
              </button>
            </div>

            {/* Credits Info */}
            <div className="mt-8 flex items-center justify-center">
              <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                <img src={assets.star_group} alt="Credits" className="h-5 w-5 mr-2" />
                <span className="font-semibold text-gray-700">Credits remaining: <span className="text-blue-600">24</span></span>
              </div>            </div>
          </div>
        </motion.div>
        )}        {/* Generate New Button Section - Only show after generation */}
        {hasGenerated && (
          <div className="mt-8">
            <div className="text-center">
              <div 
                onClick={() => {
                  setHasGenerated(false)
                  setImage(null)
                  setPrompt('')
                  setIsImageLoaded(false)
                }}
                className="cursor-pointer"
              >
                <Generatebtn />
              </div>
              <p className="text-gray-500 text-sm mt-4">Click to generate another image</p>
            </div>
          </div>
        )}{/* Additional Actions - Only show after generation */}
        {hasGenerated && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Share */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Art</h3>
            <p className="text-gray-600 text-sm mb-4">Show off your AI-generated masterpiece</p>
            <button 
              onClick={() => {
                navigator.share ? 
                navigator.share({
                  title: 'My AI Generated Image',
                  text: 'Check out this amazing AI-generated image!',
                  url: window.location.href
                }) : 
                navigator.clipboard.writeText(window.location.href).then(() => 
                  alert('Link copied to clipboard!')
                )
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Share
            </button>
          </div>

          {/* Save to Gallery */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">🖼️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Save to Gallery</h3>
            <p className="text-gray-600 text-sm mb-4">Add to your personal collection</p>
            <button 
              onClick={() => {
                // Simulate saving to gallery
                alert('Image saved to your gallery! 🖼️')
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>{/* Buy More Credits */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need More Credits?</h3>
            <p className="text-gray-600 text-sm mb-4">Generate unlimited AI images</p>
            <button 
              onClick={() => navigate('/buy')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Buy Credits            </button>
          </div>
        </div>        )}
      </div>
    </motion.div>
  )
}

export default Result