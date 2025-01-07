import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import Products from './Products';
import FeaturedCategories from './FeaturedCategories';

export default function Home() {
  return (
    <>
      {/* start banner */}
      <Banner />
      {/* start banner */}
      {/* start main */}
      <main style={{width:'100%'}}>
        <Box width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} mt={'20px'}>
        <FeaturedCategories/>
          <Stack direction={'row'} gap={'2%'}>
            {/* start products  */}
            <Products />
            {/* end products  */}
          </Stack>
        </Box>
      </main>
      {/* end main */}
    </>

  )
}


