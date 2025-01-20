import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import List from './Pages/List';
import Single from './Pages/Single';
import New from './Pages/New';
import Edit from './Pages/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Style/dark.scss';
import { DarkModeContext } from './Context/DarkModeContext';
import { AuthContext } from './Context/AuthContext';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  typography: {
    fontFamily: '"Baloo Bhaijaan 2", sans-serif',
  },
});

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { token } = useContext(AuthContext);

  const renderRoutes = (type) => (
    <>
      <Route path={`/${type=='category' ? 'categories':`${type}s`}`} element={<List rowType={type} />} />
      <Route path={`/${type=='category' ? 'categories':`${type}s`}/:id`} element={<Single rowType={type} />} />
      <Route path={`/${type=='category' ? 'categories':`${type}s`}/edit/:id`} element={<Edit rowType={type} />} />
    </>
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/' element={token ? <Home /> : <Login />} />
          <Route path='/login' element={token ? <Home /> : <Login />} />
          <Route path='*' element={<NotFound />} />
          {renderRoutes('user')}
          {renderRoutes('product')}
          {renderRoutes('product-variant')}
          {renderRoutes('brand')}
          {renderRoutes('category')}
          {renderRoutes('slider')}
          {renderRoutes('comment')}
          {renderRoutes('order')}
          <Route path='/new' element={<New />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default App;
