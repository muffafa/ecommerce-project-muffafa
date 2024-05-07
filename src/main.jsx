import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MarketContextProvider from './Context/MarketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <MarketContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MarketContextProvider>

)
