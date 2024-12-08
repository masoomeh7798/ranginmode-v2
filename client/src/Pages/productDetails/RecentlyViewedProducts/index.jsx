import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ProductCard from '../../Home/Products/ProductCard';
import './style.css'
import { useSelector } from 'react-redux';


export default function RecentlyViewedProducts() {
    const [products, setProducts] = useState([]);
    const {user,token}=useSelector(state=>state.auth)
   
    useEffect(() => {
        if (user && token) {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API+`user/${user?.id}`,{
                    method: 'GET',
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                const data = await res.json()
                setProducts(data?.data?.user?.recentlyProductIds)
            } catch (error) {
                console.log(error);
            }
        })()}

    }, []);
   
    const items = products?.map((e, index) => (
        <SwiperSlide  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} key={index}>
            <ProductCard 
           id={e._id}
           name={e?.name}
           description={e?.description}
           variants={e?.variants}
           brand={e?.brandId?.title}
           rating={e?.rating}
           price={e?.price}
           finalPrice={e?.finalPrice}
           discount={e?.discount}
           img={e.images}
           dynamicWidth={'99.5%'}/>
        </SwiperSlide>
    ))
    return (
        <Stack width={'100%'}  my={2}>
            <Stack direction='row' alignItems={'center'} justifyContent={'space-between'} mb={1.5} >
                <Typography fontSize={'2em'} component={'h3'}>اخيرا ديده ايد</Typography>
            </Stack>
            <Swiper
                slidesPerView={1}
                spaceBetween={'12px'}
                navigation={true}
                breakpoints={{
                    350: {
                        slidesPerView: 1.5,
                        spaceBetween: 5,
                    },
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    },
                    770: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1000: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1500: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation]}
                className="recent-pr-slider"
            >

                {items}
            </Swiper>

        </Stack>
    )
}
