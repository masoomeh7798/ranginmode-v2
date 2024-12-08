import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box } from '@mui/material';

export default function Banner() {
  const [banners, setBanners] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API+'slider?filters[position][$eq]=home-main-slider' )
        const data = await res.json()
        setBanners(data?.data?.slider)
      } catch (error) {
        console.log(error);
      }
    })()

  }, []);
  const items = banners?.map((e, index) => (
    <SwiperSlide key={index} style={{ boxShadow: '0 0 5px 2px rgba(0,0,0,.2)',borderRadius:'16px' }}><img style={{objectFit:'cover',objectPosition:'left'}}
    src={import.meta.env.VITE_BASE_URL+`${e?.image}`} alt={e?.title} /></SwiperSlide>
  ))
  return (

    <> {banners &&
      <Box overflow={'hidden !important'} sx={{
        '& img':{
          transition:'transform 5s'
        },
        '& img:hover':{
          transform:'scale(1.2)',
          cursor:'pointer'
        }
      }}>
      <Box width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} my={'20px'} >
        <Swiper
          loop={true}
          spaceBetween={15}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="home-slider"
        >
          {banners && items}
        </Swiper></Box></Box>}    </>

  )
}


