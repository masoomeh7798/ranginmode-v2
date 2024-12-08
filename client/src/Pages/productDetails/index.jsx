import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { Stack } from '@mui/material';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { useParams } from 'react-router-dom';
import ProductDetailsTop from './ProductDeatilsTop';
import ProductDetailsBottom from './ProductDeatilsbottom'
import RecentlyViewedProducts from './RecentlyViewedProducts';




export default function ProductDetails() {
    const { id } = useParams()

  

    return (
        <>
            <Stack width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} my={2} gap={2}>
                {/* start product details top section */}
                <ProductDetailsTop productId={id} />
                {/* end product details top section */}

                {/* end product details bottom section */}
                <ProductDetailsBottom productId={id} />
                {/* end product details bottom section */}

                {/* start Recently viewed products */}
                <RecentlyViewedProducts/>
                {/* end Recently viewed products */}



            </Stack>
        </>
    );
}

