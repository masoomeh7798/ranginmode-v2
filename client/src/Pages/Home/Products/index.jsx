import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import NewestProducts from './NewestProducts';
import PopularProducts from './PopularProducts';
import DiscountBanner from './DiscountsBanner';



export default function Products() {

    return (
        <Stack width={{xs:'100%',lg:'79%'}}>
            {/* start newest products */}
            <NewestProducts/>
            {/* end newest products */}
            {/* start popular products */}
            <PopularProducts/>
            {/* end popular products */}
            {/* start discounts banner */}
            <DiscountBanner/>
            {/* end discounts banner */}
        </Stack>
    )
}




