import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from "motion/react"

const Login = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      // Simulate successful login/signup
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        credits: 25
      }
      
      login(userData)
      alert(`🎉 ${isLogin ? 'Welcome back!' : 'Account created!'}`)
      setLoading(false)
      onClose()
      setFormData({ name: '', email: '', password: '' })
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-xl w-full max-w-xs" 
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        >
          
          {/* Header */}
          <motion.div 
            className="p-4 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.button 
              onClick={onClose} 
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
            <motion.img 
              src={assets.logo} 
              alt="Logo" 
              className="h-6 mx-auto mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            />
            <motion.h2 
              className="text-lg font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {isLogin ? 'Welcome Back!' : 'Join Imagify'}
            </motion.h2>
          </motion.div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="p-4 space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                  required 
                  disabled={loading}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
            
            <motion.input 
              type="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 outline-none text-sm"
              required 
              disabled={loading}
              whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            />

            <motion.input 
              type="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-blue-500 outline-none text-sm"
              required 
              disabled={loading}
              minLength="6"
              whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            />

            <motion.button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 text-sm"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              animate={loading ? { opacity: [1, 0.7, 1] } : {}}
              transition={loading ? { duration: 1, repeat: Infinity } : { duration: 0.2 }}
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>

            <div className="text-center pt-1">
              <motion.button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Create Account' : 'Sign In Instead'}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login