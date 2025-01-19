import { Box, Button, Stack, TableFooter, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useFormFields from '../../Utils/useFormFields'
import { useDispatch, useSelector } from 'react-redux'
import notify from '../../Utils/notify'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { setIsChangedCartQuantity } from '../../Store/Slices/CartSlice'


export default function Payment() {
    const { token, user } = useSelector(state => state.auth)
      const { isChangedCartQuantity} = useSelector(state => state.cart)
    const [cart, setCart] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // set cart final state in table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        [`&.${tableCellClasses.footer}`]: {
            fontSize: 14,
            fontWeight: 600
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(() => {
        (async () => {
            let guestId = localStorage.getItem('guestId')
            if (!token && !guestId) {
                return
            }
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `cart/guest-user-cart`, {
                    "method": "POST",
                    headers: {
                        authorization: token ? `Bearer ${token}` : '',
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ guestId })
                })
                const data = await res.json()
                setCart(data?.data)
            } catch (error) {
                console.log(error);
            }
        })()

    }, [isChangedCartQuantity]);

    const [fields, handleChange] = useFormFields({
        name: 'نام',
        lastName: 'نام خانوادگي',
        phone: 'شماره موبايل',
        state: 'استان',
        city: 'شهر',
        postalCode: 'كدپستي',
        fullAddress: 'آدرس كامل',
    })
    const [initialValues, setInitialValues] = useState({
        name: 'نام',
        lastName: 'نام خانوادگي',
        phone: 'شماره موبايل',
        state: 'استان',
        city: 'شهر',
        postalCode: 'كدپستي',
        fullAddress: 'آدرس كامل',
    });

    const handlePayment = async () => {
        let guestId = localStorage.getItem('guestId')
        if (!token && !guestId) {
            return
        }
        const address={...fields}
        for(let value of Object.values(address)){
            if(value.trim()==''){
                notify('error','همه فيلد ها را پر كنيد.')
                return
            }
        }
        for(let value of Object.values(initialValues)){
            if(Object.values(address).includes(value)){
                notify('error','آدرس صحيح نيست.')
                return
            }
        }
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'order/payment', {
                method: 'POST',
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                    "content-type": "application/json"
                },
                body: JSON.stringify({ address, guestId })
            })
            const data = await res.json()
            if (data?.success) {
                dispatch(setIsChangedCartQuantity())
                navigate('/')
                window.open(data?.data) 

            } else {
                notify('error', data?.message)
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
        <Box
            width={{ lg: '85%', sm: '90%', xs: "90%" }}
            mx={'auto'}
            py={{ xs: 2, md: 3 }}
            display={'flex'}
            flexDirection={'column'}
            gap={{ xs: 2, sm: 5 }}
        >

            {/* start table */}
            <Box>
                <Typography
                    fontWeight={500}
                    fontSize={{ xs: '24px', md: '26px' }}
                    mb={{ xs: 1, md: 1.5 }}
                >سبد خريد</Typography>
                <TableContainer component={Paper}
                    sx={{
                        '& th': {
                            bgcolor: 'var(--secondary-clr) !important'
                        },
                        width: '100%',
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Table sx={{
                        width: '100%',
                        '& th,& td': {
                            p: { xs: '8px', md: '16px' }
                        }
                    }}
                        aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">محصول</StyledTableCell>
                                <StyledTableCell align="center">قيمت واحد (ت)</StyledTableCell>
                                <StyledTableCell align="center">تعداد</StyledTableCell>
                                <StyledTableCell align="center">مجموع قيمت (ت)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart && cart?.items?.length != 0 && cart?.items?.map((e, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">
                                        <Stack
                                            direction={'row'}
                                            alignItems={'center'}
                                            gap={2}
                                        >
                                            <Box
                                                sx={{
                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }
                                                }}
                                                width={{ xs: '60px', md: '80px' }}
                                                height={{ xs: '65px', md: '80px' }}
                                            >
                                                <img src={import.meta.env.VITE_BASE_URL + e?.productId?.images[0]} alt={e?.productId?.name} />
                                            </Box>
                                            <Stack
                                                gap={1}
                                                width={{ md: '250px', lg: '220px', xl: '300px' }}
                                                alignItems={'center'}
                                                flexDirection={'row'}
                                                height={'100%'}
                                                sx={{
                                                    '& a': {
                                                        color: 'var(--primary-clr)',
                                                        transition: 'all .3s',
                                                        '&:hover': {
                                                            color: '#FAAF00'
                                                        }
                                                    }
                                                }}
                                            >
                                                <Link to={`/product-details/${e?.productId?._id}/${e?.productId?.name?.replaceAll(' ', '-')}`} target='_blank'>
                                                    <Typography
                                                        textAlign={'start'}
                                                        fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
                                                    >{e?.productId?.name?.split(' ').slice(0, 8).join(' ')} - {e?.variantId?.name?.split(' ').slice(0, 8).join(' ')}</Typography></Link>
                                            </Stack>
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{e?.variantId?.finalPrice?.toLocaleString()}</StyledTableCell>
                                    <StyledTableCell
                                        sx={{
                                            '& .quantityChanger button': {
                                                padding: { md: '8px' }
                                            },
                                            '& .quantityChanger': {
                                                gap: { md: '8px' }
                                            }
                                        }}
                                        align="center">
                                        <Typography>{e?.quantity}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{(e?.variantId?.finalPrice * e?.quantity).toLocaleString()}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow
                                sx={{
                                    borderTop: '1px solid rgba(0,0,0,.2)'
                                }}
                            >
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"
                                    sx={{
                                        fontWeight: '400 !important'
                                    }}
                                >ارسال با پست پيشتاز:&nbsp;&nbsp; 35,000 تومان</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center">مبلغ نهايي: &nbsp;&nbsp;{(cart?.totalPrice + 35000)?.toLocaleString()}  تومان</StyledTableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>



                {/* start table under md */}
                <Box display={{ md: 'none' }}>
                    {cart?.items?.map((e, index) => (
                        <Stack
                            key={index}
                            width={'100%'}
                            display={{ md: 'none' }}
                            overflow={'hidden'}
                            direction={'row'}
                            borderBottom={'1px solid rgba(0,0,0,.2)'}
                            alignItems={'center'}
                            p={'16px'}
                            gap={2}
                        >
                            <Box
                                sx={{
                                    '& img': {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }
                                }}
                                width={{ xs: '100px', xxs: '150px', sm: '200px' }}
                                height={{ xs: '100px', xxs: '150px', sm: '200px' }}
                            >
                                <img src={import.meta.env.VITE_BASE_URL + e?.productId?.images[0]} alt={e?.productId?.name} />
                            </Box>
                            <Stack
                                width={'100%'}
                            >
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    py={1}
                                    sx={{
                                        '& a': {
                                            color: 'var(--primary-clr)',
                                            transition: 'all .3s',
                                            '&:hover': {
                                                color: '#FAAF00'
                                            }
                                        }
                                    }}
                                >
                                    <Link to={`/product-details/${e?.productId?._id}/${e?.productId?.name?.replaceAll(' ', '-')}`} target='_blank'>
                                        <Typography

                                            textAlign={'start'}
                                            fontSize={{ xs: '12px', xxs: '14px' }}
                                            width={{ xs: 80, xxs: 150, sm: 200 }}
                                            textOverflow={'wrap'}
                                            sx={{
                                                width: '100%'
                                            }}
                                        >{e?.productId?.name?.split(' ').slice(0, 8).join(' ')} - {e?.variantId?.name?.split(' ').slice(0, 8).join(' ')}</Typography>
                                        <Typography></Typography>
                                    </Link>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    borderBottom={'1px dashed rgba(0,0,0,.2)'}
                                    py={1}
                                    sx={{
                                        '& a': {
                                            color: 'var(--primary-clr)',
                                            transition: 'all .3s',
                                            '&:hover': {
                                                color: '#FAAF00'
                                            }
                                        },
                                        '& p': {
                                            fontSize: { xs: '12px', sm: '14px', md: '16px' }
                                        }
                                    }}
                                >
                                    <Typography
                                        textAlign={'start'}

                                    >قيمت واحد</Typography>
                                    <Typography>{e?.variantId?.finalPrice?.toLocaleString()}</Typography>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    borderBottom={'1px dashed rgba(0,0,0,.2)'}
                                    py={1}
                                    sx={{
                                        '& p': {
                                            fontSize: { xs: '12px', sm: '14px', md: '16px' }
                                        }
                                    }}
                                >
                                    <Typography
                                        textAlign={'start'}
                                    >تعداد</Typography>
                                    <Typography>{e?.quantity}</Typography>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    py={1}
                                    sx={{
                                        '& a': {
                                            color: 'var(--primary-clr)',
                                            transition: 'all .3s',
                                            '&:hover': {
                                                color: '#FAAF00'
                                            }
                                        },
                                        '& p': {
                                            fontSize: { xs: '12px', sm: '14px', md: '16px' }
                                        }
                                    }}
                                >
                                    <Typography
                                        textAlign={'start'}
                                    >مجموع قيمت</Typography>
                                    <Typography>{(e?.variantId?.finalPrice * e?.quantity)?.toLocaleString()}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                    <Box
                        display={'flex'}
                        justifyContent={'end'}
                        gap={2}
                        mt={2}
                        sx={{
                            '& p': {
                                fontSize: '14px'
                            }
                        }}
                    >
                        <Typography align="center">ارسال با پست پيشتاز:</Typography>
                        <Typography align="center">35,000  تومان</Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'end'}
                        gap={2}
                        mt={2}
                        sx={{
                            '& p': {
                                fontSize: '16px',
                                fontWeight: 500
                            }
                        }}
                    >
                        <Typography align="center">مبلغ نهايي:</Typography>
                        <Typography align="center">{(cart?.totalPrice + 35000)?.toLocaleString()}  تومان</Typography>
                    </Box>
                </Box>
                {/* end table under md */}
            </Box>
            {/* end table */}


            {/* start address part */}
            <Stack height={'fit-content'}
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
                    gap={{ xs: '15px 0', md: '20px 0' }}
                    sx={{
                        '& > div': {
                            width: { xs: '100%', md: '49.25%' },
                            // height: '50px',
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
                            top: '42%',
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
            <Box >
                <Typography
                    fontWeight={500}
                    fontSize={{ xs: '24px', md: '26px' }}
                    mb={{ xs: 1, md: 1.5 }}
                >درگاه پرداخت</Typography>
                <Stack
                    alignItems={'start'}
                >

                    <Box
                        sx={{
                            '& img': {
                                height: 150
                            }
                        }}
                    >
                        <img src="/zarin-palpng.parspng.com_.png" alt="zarinpal" />
                    </Box>
                    <Button
                        onClick={handlePayment}
                        sx={{
                            borderRadius: '4px',
                            height: 'fit-content',
                            width: { xs: '100%', sm: '20%' },
                            alignSelf: 'center',
                            bgcolor: "var(--third-clr)",
                            color: 'var(--primary-clr)',
                            padding: '8px 5px 8px 16px ',
                            my: '16px',
                            transition: "all .5s",
                            '&:hover': { bgcolor: "var(--secondary-clr)", color: 'var(--text-clr)' }
                        }}

                    >
                        <Typography fontSize={{ xs: '12px', xxs: '14px', sm: '16px' }} fontWeight={500} mr={1}>پرداخت</Typography>
                    </Button>
                </Stack>
            </Box>
            {/* end payment part */}
        </Box>
    )
}
