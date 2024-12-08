import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useFormFields from '../../Utils/useFormFields'
import { useDispatch, useSelector } from 'react-redux'
import notify from '../../Utils/notify'
import { changedQuantity, setIsRemoved } from '../../Store/Slices/CartSlice'
import { useNavigate } from 'react-router-dom'



export default function Payment() {
    const { token, user } = useSelector(state => state.auth)
    const { dynamicQunatityD,isRemoved } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleChangedQuantity = () => {
        dispatch(changedQuantity(!dynamicQunatityD))
    };
    const handleRemove = () => {
        dispatch(setIsRemoved(isRemoved - 1));
      };


    const [fields, handleChange] = useFormFields({
        name: 'نام',
        lastName: 'نام خانوادگي',
        phone: 'شماره موبايل',
        state: 'استان',
        city: 'شهر',
        postalCode: 'كدپستي',
        fullAddress: 'آدرس كامل',
    })
    const [trackingCode, setTrackingCode] = useState();
    const [initialValues, setInitialValues] = useState({
        name: 'نام',
        lastName: 'نام خانوادگي',
        phone: 'شماره موبايل',
        state: 'استان',
        city: 'شهر',
        postalCode: 'كدپستي',
        fullAddress: 'آدرس كامل',
    });

    const handleSetOrder = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'order', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: { ...fields }, trackingCode })
            })
            const data = await res.json()
            if(data?.success){
                notify('success',data?.message)
                handleChangedQuantity()
                handleRemove()
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            }else{
                notify('error',data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        if (fields[name] == "") {
            handleChange({ target: { name, value: initialValues[name] } })
        }

    };

    return (
        <Box width={{ lg: '85%', sm: '90%', xs: "90%" }} mx={'auto'} py={{ xs: 2, md: 3 }}>
            {/* start address part */}
            <Stack
                pb={6}
            >
                <Typography
                    fontWeight={500}
                    fontSize={{ xs: '24px', md: '26px' }}
                    mb={{ xs: 1, md: 2 }}
                >آدرس</Typography>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    flexWrap={'wrap'}
                    justifyContent={'space-between'}
                    gap={{ xs: '28px 0' }}
                    sx={{
                        '& > div': {
                            width: { xs: '100%', md: '49.25%' },
                            height: '50px',
                            '& input': {
                                height: '100%'
                            }
                        },
                        '& > div:last-child': {
                            width: '100%'
                        },
                        '& label': {
                            color: 'var(--secondary-clr)',
                            fontWeight: 500,
                            fontSize: '12px',
                            top: '50%',
                            left: '20px',
                            transform: 'translateY(-25%)',
                            '& span': {
                                display: 'none'
                            }
                        },
                        '& fieldset': {
                            border: 'none'
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'var(--text-clr)',
                            '& input': {
                                borderRadius: 'inherit',
                                boxShadow: ' inset 0 0 5px 2px rgba(0,0,0,.2)',
                            },
                            '& input:focus': {
                                boxShadow: ' inset 0 0 5px 2px rgba(0,0,0,.5)',

                            }
                        }
                    }}
                >
                    {Object?.keys(initialValues)?.map((e, index) => (
                        <TextField
                            key={index}
                            value={fields[e] || ""}
                            onBlur={handleBlur}
                            onFocus={() => handleChange({ target: { name: e, value: '' } })}
                            onChange={handleChange}
                            name={e}
                            required
                            label="اجباري"
                        />
                    ))}
                </Stack>
            </Stack>
            {/* end address part */}

            {/* start payment part */}
            <Stack
                mb={{ xs: 1, md: 2 }}
            >
                <Typography
                    fontWeight={500}
                    fontSize={{ xs: '24px', md: '26px' }}
                    mb={{ xs: 1, md: 2 }}
                >پرداخت</Typography>
                <Stack
                    gap={2}
                >
                    <Typography textAlign={'justify'} mb={2}>
                        لطفا مبلغ اقلام خريداري شده را به شماره كارت زير واريز نماييد و كد رهگيري را در بخش ذكر شده وارد كنيد.
                    </Typography>
                    <Box>شماره كارت:   6037-6666-6666-6666</Box>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent={'space-between'}
                        gap={2}
                        alignItems={{ xs: 'start', md: 'end' }}
                    >
                        <TextField
                            onChange={(e) => setTrackingCode(e.target.value)}
                            name='trackingCode'
                            sx={{
                                width: 'fit-content',
                                '& input': {
                                    height: '100%'
                                },
                                '& label': {
                                    right: '15%',
                                    top: '8%',
                                    transformOrigin: 'top right'
                                }
                            }}
                            id="filled-basic" label="كد رهگيري" variant="filled" />
                        <Button
                            onClick={handleSetOrder}
                            sx={{
                                bgcolor: 'var(--secondary-clr)',
                                color: 'var(--text-clr)',
                                px: '24px',
                                fontSize: '16px',
                                fontWeight: 500,
                                maxHeight: '48px',
                                width: 'fit-content'
                            }}
                        >ثبت سفارش</Button>
                    </Stack>
                </Stack>
            </Stack>
            {/* end payment part */}
        </Box>
    )
}
