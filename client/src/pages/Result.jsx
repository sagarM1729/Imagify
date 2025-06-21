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
      alert(`${isLogin ? 'Login' : 'Account created'} successful!`)
      setLoading(false)
      setShowAuth(false)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }, 1500)
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
            <div key={plan.id} className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold">🔥 MOST POPULAR</div>}
              
              <div className="p-8">
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

                <button onClick={() => openAuth(plan.id)} className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Access</h3>
              <p className="text-gray-600">Credits added immediately</p>
            </div>
            <div>
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Expiration</h3>
              <p className="text-gray-600">Credits never expire</p>
            </div>
            <div>
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Encrypted transactions</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "What happens if I run out of credits?", a: "Purchase more anytime. Your account stays active." },
              { q: "Can I upgrade my plan?", a: "Yes! Credits from different purchases combine." },
              { q: "Do credits expire?", a: "No! Use them whenever you want." },
              { q: "Payment methods?", a: "Major credit cards and PayPal accepted." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAuth(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className="p-6 border-b relative">
              <button onClick={() => setShowAuth(false)} className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600">×</button>
              <div className="text-center">
                <img src={assets.logo} alt="Logo" className="h-10 mx-auto mb-4" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back!' : 'Join Imagify'}
                </h2>
              </div>
            </div>

            {/* Plan Info */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 text-center border-b">
              <div className="bg-white rounded-full px-4 py-2 inline-flex items-center shadow-sm">
                <span className="font-semibold mr-2">{selectedPlanData?.name} Plan</span>
                <span className="text-2xl font-bold">${selectedPlanData?.price}</span>
              </div>
              <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                <img src={assets.star_group} alt="Credits" className="h-4 w-4 mr-1" />
                {selectedPlanData?.credits.toLocaleString()} Credits
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                  required={!isLogin} 
                  disabled={loading} 
                />
              )}
              
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                required 
                disabled={loading} 
              />

              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                required 
                disabled={loading}
                minLength="6" 
              />

              {!isLogin && (
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
                  required={!isLogin} 
                  disabled={loading} 
                />
              )}

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : `${isLogin ? 'Sign In' : 'Create Account'} & Purchase`}
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                ) : (
                  <img src={assets.star_group} className="h-4 w-4" alt="" />
                )}
              </button>

              <div className="text-center pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <div className="text-center text-gray-500 text-sm">Or continue with</div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-center px-4 py-2 border rounded-xl hover:bg-gray-50">
                    <span className="text-xl mr-2">🔍</span>
                    <span>Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center px-4 py-2 border rounded-xl hover:bg-gray-50">
                    <span className="text-xl mr-2">📘</span>
                    <span>Facebook</span>
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