import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './Context/DarkModeContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SidebarContextProvider } from './Context/SidebarContext.jsx'
import { OrderContextProvider } from './Context/OrderContent.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderContextProvider>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <SidebarContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SidebarContextProvider>
        </DarkModeContextProvider>
      </AuthContextProvider>
    </OrderContextProvider>
  </StrictMode>,
)
