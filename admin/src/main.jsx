import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {DarkModeContextProvider} from './Context/DarkModeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </DarkModeContextProvider>
  </StrictMode>,
)
