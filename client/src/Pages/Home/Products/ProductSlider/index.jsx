import React from 'react'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './style.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import InnerImageZoom from 'react-inner-image-zoom';



export default function ProductSlider({ img }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(0);
    return (
        <>
            <Swiper

                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',   
                    
                }}
                loop={true}
                spaceBetween={10}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[ Thumbs]}
                className="product-slider-2"
            >
                {img?.map((e, index) => (
                    <SwiperSlide key={index}>
                        <InnerImageZoom zoomType='hover' zoomScale={1}
                            src={import.meta.env.VITE_BASE_URL + `${e}`} />
                    </SwiperSlide>

                ))}

            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-slider-3"
            >
                 {img?.map((e, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={import.meta.env.VITE_BASE_URL + `${e}`} />
                    </SwiperSlide>

                ))}
            </Swiper>
        </>
    )
}
