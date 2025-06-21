import React, { useState } from 'react'
import { assets } from '../assets/assets'

const BuyCredit = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const plans = [
    { id: 'basic', name: 'Basic', credits: 100, price: 10, popular: false, features: ['100 Generations', 'Standard Quality', 'Basic Support'] },
    { id: 'pro', name: 'Pro', credits: 500, price: 50, popular: true, features: ['500 Generations', 'High Quality', 'Priority Support', 'API Access'] },
    { id: 'enterprise', name: 'Enterprise', credits: 5000, price: 250, popular: false, features: ['5000 Generations', 'Ultra Quality', '24/7 Support', 'Custom Models'] }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert(`${isLogin ? 'Login' : 'Account created'} successful! Proceeding to payment...`)
      setLoading(false)
      setShowAuth(false)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }, 2000)
  }

  const openAuth = (planId) => {
    setSelectedPlan(planId)
    setShowAuth(true)
  }

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-xl">Unlock AI image generation with flexible credit packages</p>
          <div className="mt-8 inline-flex items-center bg-white rounded-full shadow-lg px-6 py-3">
            <img src={assets.star_group} alt="Credits" className="h-6 w-6 mr-2" />
            <span className="font-semibold">Current Credits: <span className="text-blue-600">25</span></span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">🔥 MOST POPULAR</div>}
              
              <div className={`p-8 ${plan.popular ? 'pt-16' : 'pt-8'}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-4">${plan.price}</div>
                  <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-2">
                    <img src={assets.star_group} alt="Credits" className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{plan.credits.toLocaleString()} Credits</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => openAuth(plan.id)} className={`w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'}`}>
                  Get Started
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
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Do credits expire?</h3>
              <p className="text-gray-600 text-sm">No! Your credits never expire. You can use them whenever you want, there's no time limit or pressure.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and safe.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-200/50 relative">
              <button 
                onClick={() => setShowAuth(false)} 
                className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-300"
              >
                ×
              </button>
              <div className="text-center">
                <img src={assets.logo} alt="Logo" className="h-10 mx-auto mb-4" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join Imagify'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isLogin ? 'Sign in to purchase your plan' : 'Create your account to get started'}
                </p>
              </div>
            </div>

            {/* Plan Info */}
            <div className="p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-gray-100/50">
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center shadow-sm border border-white/30">
                  <span className="font-semibold text-gray-800 mr-2">{selectedPlanData?.name} Plan</span>
                  <span className="text-2xl font-bold text-gray-900">${selectedPlanData?.price}</span>
                </div>
                <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                  <img src={assets.star_group} alt="Credits" className="h-4 w-4 mr-1" />
                  {selectedPlanData?.credits.toLocaleString()} Credits
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full p-3 border-2 border-gray-300/50 bg-white/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700" 
                    required={!isLogin} 
                    disabled={loading} 
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full p-3 border-2 border-gray-300/50 bg-white/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700" 
                  required 
                  disabled={loading} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  className="w-full p-3 border-2 border-gray-300/50 bg-white/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700" 
                  required 
                  disabled={loading}
                  minLength="6" 
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword} 
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                    className="w-full p-3 border-2 border-gray-300/50 bg-white/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700" 
                    required={!isLogin} 
                    disabled={loading} 
                  />
                </div>
              )}

              {/* Forgot Password (Only for Login) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading} 
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? 'Processing...' : `${isLogin ? 'Sign In' : 'Create Account'} & Purchase`}
                </span>
                
                {loading ? (
                  <div className="relative z-10 animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                ) : (
                  <img src={assets.star_group} className="relative z-10 h-4 w-4" alt="" />
                )}
              </button>

              {/* Terms (Only for Sign Up) */}
              {!isLogin && (
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
                </p>
              )}

              <div className="text-center pt-4 border-t border-gray-200/50">
                <p className="text-gray-600 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border-2 border-gray-300/50 rounded-xl hover:bg-gray-50/80 hover:border-gray-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-xl mr-2">🔍</span>
                    <span className="font-medium text-gray-700">Google</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border-2 border-gray-300/50 rounded-xl hover:bg-gray-50/80 hover:border-gray-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-xl mr-2">📘</span>
                    <span className="font-medium text-gray-700">Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuyCredit