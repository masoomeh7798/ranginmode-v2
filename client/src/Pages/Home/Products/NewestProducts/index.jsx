import React from 'react'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import ProductCard from '../ProductCard';


export default function NewestProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API+`product?limit=10&sort=-createdAt`)
                const data = await res.json()
                setProducts(data?.data)
            } catch (error) {
                console.log(error);
            }
        })()

    }, []);

    const items = products?.map((e, index) => (
        <SwiperSlide  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} key={index}>
           <ProductCard 
           id={e._id}
           name={e?.name}
           description={e?.description}
           brand={e?.brandId?.title}
           images={e?.images}
           productVariantIds={e?.productVariantIds}
           />
        </SwiperSlide>
    ))
    return (
        <Stack width={'100%'} my={3}>
                <Typography  mb={{xs:1,md:2,lg:2.2}} fontSize={{xs:24,md:32,lg:36}} component={'h3'}> <Link style={{color:'var(--primary-clr)'}} to='/products/all/all-products'>جدیدترین محصولات</Link></Typography>
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
                className="product-slider"
            >

                {items}
            </Swiper>

        </Stack>
    )
}
