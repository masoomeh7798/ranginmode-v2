import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import TokenContext from './Utils/TokenContext.js'

// start default theme 
const theme = createTheme({
  "breakpoints": {
    "keys": ["xs", "xxs", "sm", "md", "lg", "xl"],
    "values": {
      "xs": 0,
      "xxs": 300,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    }
  },
  "palette": {
    "mode": "light",
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "primary": {
      "main": "#2A363B",
      "light": "#42a5f5",
      "dark": "#1565c0",
      "contrastText": "#fff"
    },
    "secondary": {
      "main": "#CF4647",
      "light": "#ba68c8",
      "dark": "#7b1fa2",
      "contrastText": "#fff"
    },
    "error": {
      "main": "#d32f2f",
      "light": "#ef5350",
      "dark": "#c62828",
      "contrastText": "#fff"
    },
    "warning": {
      "main": "#F5D061",
      "light": "#ff9800",
      "dark": "#e65100",
      "contrastText": "#fff"
    },
    "info": {
      "main": "#F8F6F6",
      "light": "#03a9f4",
      "dark": "#01579b",
      "contrastText": "#fff"
    },
    "success": {
      "main": "#2e7d32",
      "light": "#4caf50",
      "dark": "#1b5e20",
      "contrastText": "#fff"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2
  },

  "typography": {
    "fontFamily": "\"Baloo Bhaijaan 2\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "h1": {
      "fontSize": "6rem",
      "fontWeight": 300,
      "lineHeight": 1,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontSize": "3.75rem",
      "fontWeight": 300,
      "lineHeight": 1,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontSize": "3rem",
      "fontWeight": 400,
      "lineHeight": 1,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontSize": "2.125rem",
      "fontWeight": 400,
      "lineHeight": 1.2,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontSize": "1.5rem",
      "fontWeight": 400,
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontSize": "1.25rem",
      "fontWeight": 500,
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontSize": "1rem",
      "fontWeight": 400,
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontSize": "0.875rem",
      "fontWeight": 500,
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontSize": "1rem",
      "fontWeight": 400,
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontSize": "0.875rem",
      "fontWeight": 400,
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "textTransform": "uppercase",
      "fontSize": "0.875rem",
      "fontWeight": 500
    },
    "caption": {
      "fontSize": "0.75rem",
      "fontWeight": 400,
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontSize": "0.75rem",
      "fontWeight": 400,
      "textTransform": "uppercase",
      "letterSpacing": "0.16667em"
    }
  }

}
);
// end default theme

export default function App() {
    const [token, setToken] = useState(null);
    const handleToken=(tk)=>{
      setToken(tk)
    }


  return (
    <TokenContext.Provider value={{token,handleToken}}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Header /> */}
      <Routes>
        <Route exact path='/admin' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
    </TokenContext.Provider>
  )
}


