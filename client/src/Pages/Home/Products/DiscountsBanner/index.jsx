import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Stack, Typography } from '@mui/material';
import './style.css'
import { Link } from 'react-router-dom';

export default function DiscountBanner() {
  const [banners, setBanners] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'slider?filters[position][$eq]=home-discount-slider')
        const data = await res.json()
        setBanners(data?.data?.slider)
      } catch (error) {
        console.log(error);
      }
    })()

  }, []);
  return (
    <>
      <Stack width={'100%'} height={'30vh'} my={2}>
        <Typography variant='h3' fontSize={'1.5em'} fontWeight={400} mb={2}>تخفیفات ویژه</Typography>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={{
            clickable: true,
          }}
          breakpoints={{
            450: {
              slidesPerView: 2
            },
            900: {
              slidesPerView: 3
            },
          }
          }
          modules={[Pagination, Navigation]}
          className="discount-slider"
        >
          {banners?.map(e => (
            <SwiperSlide key={e?._id}>
              <Link to={e?.href} target='_blank'>
                <img src={import.meta.env.VITE_BASE_URL+`${e?.image}`} alt={e?.title} />
              </Link>
            </SwiperSlide>

          ))}


        </Swiper>
      </Stack>
    </>
  )
}

