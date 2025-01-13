import { Button, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useDynamicQuantity } from '../../Pages/Home/Products/ProductModal';
import notify from '../../Utils/notify';
import { setIsChangedCartQuantity } from '../../Store/Slices/CartSlice';

export default function QauntityBoxCart({ variantId, productId}) {
    const [variantQuantity, setVariantQuantity] = useState();
    const { token = null, user = null } = useSelector(state => state.auth)
    const { isChangedCartQuantity} = useSelector(state => state.cart)
    const { dynamicQuantity, handleDynamicQuantity } = useDynamicQuantity()
    
    const dispatch = useDispatch()
    const [changedValue, setChangedValue] = useState(false);
    

    //  add to cart 
    const handleAddToCart = async () => {
        let guestId = localStorage.getItem('guestId')
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'cart', {
                "method": "POST",
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                    "content-type": "application/json"
                },
                body: JSON.stringify({ guestId, productId, variantId, quantity: dynamicQuantity })
            })
            const data = await res.json();
            if (data?.success) {
                notify('success', 'سبد خريد به روز شد.')
                dispatch(setIsChangedCartQuantity())
                setChangedValue(false)
            }
        } catch (error) {
            console.log(error);
        }
    }



    // start get product variant quantity
    useEffect(() => {
        (async () => {
            try {
                if (productId && variantId) {
                    // start get initial user cart item quantitiy
                    const guestId = localStorage.getItem('guestId')
                    if (token || guestId) {
                        const resC = await fetch(import.meta.env.VITE_BASE_API + `cart/guest-user-cart`, {
                            method: 'POST',
                            headers: {
                                authorization: token ? `Bearer ${token}` : '',
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({ guestId })
                        })
                        const dataC = await resC.json()
                        if (dataC?.success) {
                            const initialQuantity = dataC?.data?.items?.filter(e => (e.variantId._id == variantId && e.productId._id == productId))[0]?.quantity || 0
                            handleDynamicQuantity(initialQuantity)
                        }
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
                onClick={() =>{ handleDynamicQuantity(prev => prev + 1);setChangedValue(true)}}
                disabled={dynamicQuantity == variantQuantity}
                sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}>
                <FaPlus color='var(--primary-clr)' fontSize={20} />
            </IconButton>

            <Typography width={'30px'} textAlign={'center'} fontSize={20}>
                {dynamicQuantity}
            </Typography>

            <IconButton
                onClick={() => {handleDynamicQuantity(prev => prev - 1);setChangedValue(true)}}
                disabled={dynamicQuantity == 1}
                sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}>
                <FaMinus color='var(--primary-clr)' fontSize={20} />
            </IconButton>
           <Button
           onClick={handleAddToCart}
           disabled={!changedValue}
           sx={{
            bgcolor:'green',
            minWidth:'42px',
            py:'4px !important',
            color:"whitesmoke",
            mr:'4px',
            '&:disabled':{
                color:'whitesmoke',
                opacity:.6
            }
           }}
           >
            ثبت
           </Button>
        </Stack>
    )
}
