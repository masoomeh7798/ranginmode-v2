import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function AsideBanner() {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
      (async () => {
        try {
          const res = await fetch(import.meta.env.VITE_BASE_API+'slider?filters[position][$eq]=home-aside-slider' )
          const data = await res.json()
          setBanners(data?.data?.slider)
        } catch (error) {
          console.log(error);
        }
      })()
  
    }, []);
    return (
        <Stack width={{xs:0,lg:'19%'}} gap={2} display={{xs:'none',lg:'flex'}} mt={3}>
            {banners?.map(e=>(
            <Box key={e?._id} overflow={'hidden'} height={{lg:'40vh',xl:'60vh'}} borderRadius={'16px'} sx={{ '& img': { width: '100%', height: '100%' ,objectFit:'cover',objectPosition:'left'} }}><img src={import.meta.env.VITE_BASE_URL+`${e.image}`} alt={e?.title} />
            </Box>
        ))}
         
        </Stack>
    )
}
