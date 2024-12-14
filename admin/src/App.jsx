import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home/index.jsx';
import Login from './Pages/Login/index.jsx';
import NotFound from './Pages/NotFound/index.jsx';
import List from './Pages/List/index.jsx';
import Single from './Pages/Single/index.jsx';
import New from './Pages/New/index.jsx';
import { productInputs, userInputs } from './formSource.js';



export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='users' element={<List/>} />
      <Route path='users/:userId' element={<Single/>} />
      <Route path='users/new' element={<New inputs={userInputs} title="افزودن كاربر"/>} />
      <Route path='products' element={<List/>} />
      <Route path='products/:productId' element={<Single/>} />
      <Route path='products/new' element={<New inputs={productInputs} title="افزودن محصول"/>} />
    </Routes>

  )
}


