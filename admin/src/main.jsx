import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './Context/DarkModeContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SidebarContextProvider } from './Context/SidebarContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <SidebarContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SidebarContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
