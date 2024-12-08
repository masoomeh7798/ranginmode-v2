import React, { useState } from 'react'
import ProductsPart from './ProductsPart'
import FilterBoxes from './FilterBoxes'
import { Stack } from '@mui/material'

export default function Products() {
  
    return (
        <Stack
            direction={{xs:'column',xl:'row'}}
            width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'}
            gap={'2%'}
            mt={'20px'}
        >
            {/* start products filters part */}
            <FilterBoxes />
            {/* end products filters part */}
            {/* start products part */}
            <ProductsPart />
            {/* end products part */}

        </Stack>
    )
}
