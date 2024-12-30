import React, { useContext } from 'react'
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
import Edit from './Pages/Edit/index.jsx';


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
          {/* user */}
          <Route path='/users' element={<List rowType={'user'} />} />
          <Route path='/users/:id' element={<Single rowType={'user'} />} />
          <Route path='/users/edit/:id' element={<Edit rowType={'user'} />} />
          {/* product */}
          <Route path='/products' element={<List rowType={'product'} />} />
          <Route path='/products/:id' element={<Single rowType={'product'} />} />
          <Route path='/products/edit/:id' element={<Edit rowType={'product'} />} />
          {/* product variant */}
          <Route path='/product-variants' element={<List rowType={'product-variant'} />} />
          <Route path='/product-variants/:id' element={<Single rowType={'product-variant'} />} />
          <Route path='/product-variants/edit/:id' element={<Edit rowType={'product-variant'} />} />
          {/* brand */}
          <Route path='/brands' element={<List rowType={'brand'} />} />
          <Route path='/brands/:id' element={<Single rowType={'brand'} />} />
          <Route path='/brands/edit/:id' element={<Edit rowType={'brand'} />} />
          {/* category */}
          <Route path='/categories' element={<List rowType={'category'} />} />
          <Route path='/categories/:id' element={<Single rowType={'category'} />} />
          <Route path='/categories/edit/:id' element={<Edit rowType={'category'} />} />
          {/* slider */}
          <Route path='/sliders' element={<List rowType={'slider'} />} />
          <Route path='/sliders/:id' element={<Single rowType={'slider'} />} />
          <Route path='/sliders/edit/:id' element={<Edit rowType={'slider'} />} />
          {/* comment */}
          <Route path='/comments' element={<List rowType={'comment'} />} />
          <Route path='/comments/:id' element={<Single rowType={'comment'} />} />
          <Route path='/comments/edit/:id' element={<Edit rowType={'comment'} />} />
          {/* create new */}
          <Route path='/new' element={<New />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </div>
  )
}


