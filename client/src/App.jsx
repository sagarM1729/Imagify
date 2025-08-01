import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'

import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import AppContextProvider from './context/AppContext'
import './index.css'


const App = () => {
  return (
    <AppContextProvider>
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyCredit />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  )
}

export default App