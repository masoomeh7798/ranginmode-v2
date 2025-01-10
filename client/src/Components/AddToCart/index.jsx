import { Button, Typography } from '@mui/material'
import React from 'react'
import { IoMdCart } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import notify from '../../Utils/notify'

export default function AddToCart({ variantId, dynamicQuantity, productId }) {

    const { token = null, user = null } = useSelector(state => state.auth)

    const handleAddToCart = async () => {
        let guestId = localStorage.getItem('guestId')
        if (!token && !guestId) {
            guestId = uuidv4()
            localStorage.setItem('guestId', guestId)
        }
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
                notify('success', data?.message)
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            onClick={handleAddToCart}
            sx={{ textWrap: 'nowrap', '& svg': { fontSize: "24px !important" }, borderRadius: '24px', bgcolor: "var(--third-clr)", color: 'var(--primary-clr)', padding: '8px 5px 8px 16px ', transition: "all .5s", '&:hover': { bgcolor: "var(--secondary-clr)", color: 'var(--text-clr)' } }} startIcon={<IoMdCart />}>
            <Typography fontSize={{ xs: '12px', xxs: '14px', sm: '16px' }} fontWeight={500} mr={1}>
                افزودن به سبد خريد
            </Typography>
        </Button>
    )
}
