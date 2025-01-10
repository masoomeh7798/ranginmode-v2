import { IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { changedQuantity, setIsAdded, setIsRemoved } from '../../Store/Slices/CartSlice';

export default function QauntityBox({ variantId, handleDynamicQuantity, dynamicQuantity, productId }) {
    const [variantQuantity, setVariantQuantity] = useState();
    const { token = null, user = null } = useSelector(state => state.auth)


    // start get product variant quantity
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `product-variant/${variantId}`)
                const data = await res.json()
                if (data?.success) {
                    setVariantQuantity(data?.data?.quantity)
                    if (data?.data?.quantity < dynamicQuantity) {
                        handleDynamicQuantity(data?.data?.quantity)
                    }
                }

                // start get initial user cart item quantitiy
                const guestId = localStorage.getItem('guestId')
                if (token || guestId) {
                    const resC = await fetch(import.meta.env.VITE_BASE_API + `cart/guest-user-cart`, {
                        method:'POST',
                        headers: {
                            authorization: token ? `Bearer ${token}` : '',
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ guestId})
                    })
                    const dataC = await resC.json()
                    if (dataC?.success) {
                        const initialQuantity=dataC?.data?.items?.filter(e=>(e.variantId==variantId && e.productId==productId))[0]?.quantity || 0
                        handleDynamicQuantity(initialQuantity)
                    }
                }

            } catch (error) {
                console.log(error);
            }
        })()

    }, [variantId]);


    return (
        <Stack className='quantityChanger' direction={'row'} alignItems={'center'} gap={2} >
            <IconButton
                onClick={() => handleDynamicQuantity(prev => prev + 1)}
                disabled={dynamicQuantity == variantQuantity}
                sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}>
                <FaPlus color='var(--primary-clr)' fontSize={20} />
            </IconButton>

            <Typography width={'30px'} textAlign={'center'} fontSize={20}>
                {dynamicQuantity}
            </Typography>

            <IconButton
                onClick={() => handleDynamicQuantity(prev => prev - 1)}
                disabled={dynamicQuantity == 0}
                sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}>
                <FaMinus color='var(--primary-clr)' fontSize={20} />
            </IconButton>
        </Stack>
    )
}
