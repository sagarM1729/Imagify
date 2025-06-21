import React, { useState } from 'react'
import { assets } from '../assets/assets'

const BuyCredit = () => {
  console.log("BuyCredit component rendered");
  
  const [selectedPlan, setSelectedPlan] = useState('pro')

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
    }
  ]

  const handlePurchase = (plan) => {
    // Handle purchase logic here
    console.log(`Purchasing ${plan.name} plan for $${plan.price}`)
    alert(`Redirecting to payment for ${plan.name} plan...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of AI image generation with our flexible credit packages
          </p>
          
          {/* Current Credits Display */}
          <div className="mt-8 inline-flex items-center bg-white rounded-full shadow-lg px-6 py-3">
            <img src={assets.star_group} alt="Credits" className="h-6 w-6 mr-2" />
            <span className="font-semibold text-gray-800">Current Credits: <span className="text-blue-600">25</span></span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                selectedPlan === plan.id ? 'ring-4 ring-blue-500' : ''
              } ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">
                    🔥 MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : 'pt-8'}`}>
                
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
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 mb-4 ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl'
                      : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg'
                  }`}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>

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
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">What happens if I run out of credits?</h3>
              <p className="text-gray-600 text-sm">You can purchase more credits anytime. Your account will still be active, you just won't be able to generate new images until you add more credits.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600 text-sm">Yes! You can purchase any credit package at any time. Credits from different purchases will be combined in your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCredit