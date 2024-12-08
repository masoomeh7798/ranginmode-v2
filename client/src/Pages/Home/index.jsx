import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import Products from './Products';
import AsideBanner from './AsideBanner';
import FeaturedCategories from './FeaturedCategories';
import NewsLetter from './NewsLetter';

export default function Home() {
  return (
    <>
      {/* start banner */}
      <Banner />
      {/* start banner */}
      {/* start main */}
      <main>
        <Box width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} mt={'20px'}>
        <FeaturedCategories/>
          <Stack direction={'row'} gap={'2%'}>
            {/* start products  */}
            <Products />
            {/* end products  */}
            {/* start aside banner  */}
            <AsideBanner />
            {/* end aside banner  */}
          </Stack>
        </Box>
      </main>
      {/* end main */}
      <NewsLetter/>
    </>

  )
}


