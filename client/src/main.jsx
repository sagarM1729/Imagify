import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import React from 'react'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </StrictMode>

)
