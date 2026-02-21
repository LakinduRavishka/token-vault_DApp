import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WalletProvider } from './context/WalletContext.js'

createRoot(document.getElementById('root')).render(
  <WalletProvider>
    <App />
  </WalletProvider>,
)
