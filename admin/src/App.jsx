import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home/index.jsx';
import Login from './Pages/Login/index.jsx';
import NotFound from './Pages/NotFound/index.jsx';
import List from './Pages/List/index.jsx';
import Single from './Pages/Single/index.jsx';
import New from './Pages/New/index.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Style/dark.scss'
import { DarkModeContext } from './Context/DarkModeContext.jsx';
import { AuthContext } from './Context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';


const theme = createTheme({
  typography: {
    fontFamily: '"Baloo Bhaijaan 2",sans-serif',
  }
});

export default function App() {
  const { darkMode } = useContext(DarkModeContext)
  const { token } = useContext(AuthContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/' element={token ? <Home /> : <Login />} />
          <Route path='/login' element={token ? <Home /> : <Login />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/users' element={<List rowType={'users'} />} />
          <Route path='/users/:userId' element={<Single rowType={'users'} />} />
          <Route path='/users/new' element={<New title="افزودن كاربر" />} />
          <Route path='/products' element={<List rowType={'products'} />} />
          <Route path='/products/:productId' element={<Single rowType={'products'}/>} />
          <Route path='/products/new' element={<New title="افزودن محصول" />} />
        </Routes>
        <Toaster/>
      </ThemeProvider>
    </div>
  )
}


