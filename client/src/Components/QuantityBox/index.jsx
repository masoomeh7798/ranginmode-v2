import { IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { changedQuantity, setIsAdded, setIsRemoved } from '../../Store/Slices/CartSlice';

export default function QauntityBox({productId}) {
    const {token,user}=useSelector(state=>state.auth)
    const {isAdded,isRemoved,dynamicQunatityD}=useSelector(state=>state.cart)
    const [dynamicQuantity, setdynamicQuantity] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const dispatch=useDispatch()


  const handleRemove = () => {
    dispatch(setIsRemoved(isRemoved - 1));
  };
  const handleAdded = () => {
    dispatch(setIsAdded(isAdded + 1));
  };
  const handleChangedQuantity = () => {
    dispatch(changedQuantity(!dynamicQunatityD))
  };
  

    useEffect(() => {
        (async()=>{
            try {
                const res=await fetch(import.meta.env.VITE_BASE_API+`user/${user?.id}`,{
                    "method":"GET",
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                const data=await res.json()
                setdynamicQuantity(data?.data?.user?.cart?.items?.filter(e=>e?.productId?._id==productId)[0]?.quantity || 0)

                const resC=await fetch(import.meta.env.VITE_BASE_API+`product/${productId}`)
                const dataC=await resC.json()
                setProductQuantity(dataC?.data?.product?.quantity)
               

            } catch (error) {
                console.log(error);
            }
        })()
        
    }, [isAdded,isRemoved,productId,user?.id,dynamicQunatityD]);


    const handleDecreaseQuantity=async()=>{
        setdynamicQuantity(dynamicQuantity - 1)
        handleChangedQuantity()
        try {
            const res=await fetch(import.meta.env.VITE_BASE_API+'cart',{
                "method":"DELETE",
                headers:{
                    authorization:`Bearer ${token}`,
                    "content-type":"application/json"
                },
                body:JSON.stringify({productId})
            })
            const data=await res.json();
           (data?.data?.remove && handleRemove())
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleIncreaseQuantity=async()=>{
        setdynamicQuantity(dynamicQuantity + 1)
        handleChangedQuantity()
        try {
            const res=await fetch(import.meta.env.VITE_BASE_API+'cart',{
                "method":"POST",
                headers:{
                    authorization:`Bearer ${token}`,
                    "content-type":"application/json"
                },
                body:JSON.stringify({productId})
            })
            const data=await res.json();
            (!data?.data?.add && handleAdded())
      
        } catch (error) {
            console.log(error);
        }
    }

   
    return (
        <Stack className='quantityChanger' direction={'row'} alignItems={'center'} gap={2} >
            <IconButton disabled={dynamicQuantity==productQuantity} onClick={handleIncreaseQuantity} sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}><FaPlus color='var(--primary-clr)' fontSize={20} />
            </IconButton>
            <Typography width={'30px'} textAlign={'center'} fontSize={20}>{dynamicQuantity}</Typography>
            <IconButton disabled={dynamicQuantity == 0} onClick={handleDecreaseQuantity} sx={{ bgcolor: 'var(--text-clr)', boxShadow: '0 1px rgba(0,0,0,.2)', border: '1px solid rgba(0,0,0,.1)', padding: { xs: '4px', sm: '10px' }, "&:disabled": { opacity: .5 } }}><FaMinus color='var(--primary-clr)' fontSize={20} />
            </IconButton>
        </Stack>
    )
}
