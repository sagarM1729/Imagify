import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import Login from '../components/Login'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const { user, openLogin, showLogin, closeLogin } = useContext(AppContext)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      credits: 100,
      price: 10,
      popular: false,
      features: [
        '100 Image Generations',
        'Standard Quality',
        'Basic Support',
        'Commercial License'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      credits: 500,
      price: 50,
      popular: true,
      features: [
        '500 Image Generations',
        'High Quality Images',
        'Priority Support',
        'Commercial License',
        'Bulk Download',
        'API Access'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 5000,
      price: 250,
      popular: false,
      features: [
        '5000 Image Generations',
        'Ultra High Quality',
        '24/7 Premium Support',
        'Extended Commercial License',
        'Bulk Download',
        'Full API Access',
        'Custom Models',
        'Priority Queue'
      ]
    }  ]
  const openAuth = (planId) => {
    setSelectedPlan(planId)
    if (!user) {
      openLogin()
    } else {
      // User is already logged in, proceed with payment
      alert(`Proceeding to payment for ${planId} plan!`)
    }
  }
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of AI image generation with our flexible credit packages
          </p>
            {/* Current Credits Display */}
          <div className="mt-8 inline-flex items-center bg-white rounded-full shadow-lg px-6 py-3">
            <img src={assets.star_group} alt="Credits" className="h-6 w-6 mr-2" />
            <span className="font-semibold text-gray-800">Current Credits: <span className="text-blue-600">{user?.credits || 0}</span></span>          </div>
        </motion.div>        {/* Plans Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {plans.map((plan, index) => (            <motion.div 
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden flex flex-col ${
                plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">
                    🔥 MOST POPULAR
                  </div>
                </div>
              )}              <div className={`p-8 ${plan.popular ? 'pt-16' : 'pt-8'} flex flex-col h-full`}>
                
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-2">USD</span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-2">
                    <img src={assets.star_group} alt="Credits" className="h-5 w-5 mr-2" />
                    <span className="font-semibold text-gray-700">{plan.credits.toLocaleString()} Credits</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Get Started Button */}
                <button
                  onClick={() => openAuth(plan.id)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 mt-auto ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl'
                      : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg'
                  }`}
                >
                  Get Started
                </button>              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Access</h3>
              <p className="text-gray-600">Credits are added to your account immediately after purchase</p>
            </div>
            <div>
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Expiration</h3>
              <p className="text-gray-600">Your credits never expire. Use them whenever you want</p>
            </div>
            <div>
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">All transactions are encrypted and secure</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "What happens if I run out of credits?", a: "You can purchase more credits anytime. Your account will still be active, you just won't be able to generate new images until you add more credits." },
              { q: "Can I upgrade my plan?", a: "Yes! You can purchase any credit package at any time. Credits from different purchases will be combined in your account." },
              { q: "Do credits expire?", a: "No! Your credits never expire. Use them whenever you want." },
              { q: "What payment methods do you accept?", a: "We accept all major credit cards and PayPal for secure transactions." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>        </div>
      </div>      {/* Simple Login Modal */}
      <Login isOpen={showLogin} onClose={closeLogin} />
    </motion.div>
  )
}

export default BuyCredit