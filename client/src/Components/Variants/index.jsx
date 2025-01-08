import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'

export default function Variants({ productVariantIds,selectedVariant }) {
    const variants = productVariantIds?.map((variant, index) => (
        <div key={index}>
            <Stack direction={'row'} gap={2} >
                <Typography fontSize={{ xs: '16px', lg: '12px', xl: '16px' }} sx={{ textDecoration: 'line-through' }}>{variant?.price} تومان</Typography>
                <Typography color='secondary' fontSize={{ xs: '18px', lg: '16px', xl: '18px' }}>{variant?.finalPrice} تومان</Typography>
            </Stack>
            <Typography sx={{ width: 'fit-content', borderRadius: "16px" }} bgcolor={'var(--third-clr)'} padding={'2px 8px'} fontSize={'14px'}>{variant?.discount}% تخفيف</Typography>
        </div>
    ))
    return variants[selectedVariant]
}
