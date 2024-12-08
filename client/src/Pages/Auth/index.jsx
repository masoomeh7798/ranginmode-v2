import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register';

export default function Auth() {
  const [pageType, setPageType] = useState('login');
  const handlePageType=()=>{
    setPageType(pageType=='login'?'register':'login')
  }
  return (
    <Stack

    sx={{
      position:'relative',
     width:'100%',
      height:'100vh',
      overflow:'hidden',
      alignItems:'center',
      justifyContent:'center'
    }}
    
    >
      {/* start Login & register part */}
      {pageType=='login' ? <Login handlePageType={handlePageType}/> : <Register handlePageType={handlePageType}/>}
      {/* end Login & register part */}

      {/* start background */}
      <Box
      sx={{
        '& img':{
          width:'100%',
          height:'100%',
          objectFit:'cover',
        }
      }}
      bgcolor={'var(--text-clr)'}
      position={'absolute'}
      top={0}
      left={0}
      height={'100%'}
      width={'100%'}
      zIndex={-1}
      className="shape-bottom"> 
      <img src="src/assets/component1.png" alt="" />
      </Box>
            {/* end background */}
    </Stack>
  )
}
