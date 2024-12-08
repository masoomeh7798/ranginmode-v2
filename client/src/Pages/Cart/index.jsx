import { Box, Button, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdOutlineClose } from "react-icons/md";
import QuantityBox from '../../Components/QuantityBox'
import { Link, useNavigate } from 'react-router-dom';
import QauntityBox from '../../Components/QuantityBox';
import { useDispatch, useSelector } from 'react-redux';
import { changedQuantity, setIsRemoved } from '../../Store/Slices/CartSlice';
import notify from '../../Utils/notify';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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


export default function Cart() {
  const [cart, setCart] = useState([]);
  const { token, user } = useSelector(state => state.auth)
  const { isAdded, isRemoved, dynamicQunatityD } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let totalQuantity = 0
  cart?.items?.map(e => {
    totalQuantity += e?.quantity
  })

  const handleChangedQuantity = () => {
    dispatch(changedQuantity(!dynamicQunatityD))
  };


  const handleRemoveItem = async (productId) => {
    dispatch(setIsRemoved(isRemoved + 1))
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + 'cart/removeItem', {
        "method": "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId })
      })
      const data = await res.json()

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `user/${user?.id}`, {
          "method": "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        setCart(data?.data?.user?.cart)
      } catch (error) {
        console.log(error);
      }
    })()

  }, [isRemoved, isAdded, dynamicQunatityD]);

  const handleCheckCartItems = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + 'order', {
        "method": "GET",
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data?.data?.change) {
        setCart(data?.data?.cart)
        notify('success', data?.message)
        handleChangedQuantity()
      } else {
        navigate('/payment')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Stack
      width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'}
      my={2}
    >
      <Typography component={'h2'}
        fontSize={{ xs: '24px', md: '32px' }}
        fontWeight={500}
        mb={{ md: 2 }}
      >
        سبد خريد
      </Typography>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        gap={{ md: 2 }}
        justifyContent={{ lg: 'space-between' }}
        alignItems={{ xs: 'center', lg: 'start' }}
        borderRadius={{ xs: '8px', md: 0 }}
        p={'1px'}
      >

        {/* start table */}
        <TableContainer component={Paper}
          sx={{
            '& th': {
              bgcolor: 'var(--secondary-clr) !important'
            },
            width: { xs: '100%', lg: '74%' },
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
                <StyledTableCell align="center">قيمت واحد</StyledTableCell>
                <StyledTableCell align="center">تعداد</StyledTableCell>
                <StyledTableCell align="center">مجموع قيمت</StyledTableCell>
                <StyledTableCell align="center">حذف</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart?.items?.map((e, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    <Stack
                      direction={'row'}
                      alignItems={'start'}
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
                        alignItems={'start'}
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
                          >{e?.productId?.name?.split(' ').slice(0, 8).join(' ')}</Typography></Link>
                        <Rating size='small' value={e?.productId?.rating} readOnly />
                      </Stack>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">{e?.productId?.finalPrice}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      '& .quantityChanger button': {
                        padding: { md: '8px' }
                      },
                      '& .quantityChanger': {
                        gap: { md: '8px' }
                      }
                    }}
                    align="center"><QuantityBox productId={e?.productId?._id} /></StyledTableCell>
                  <StyledTableCell align="center">{e?.productId?.finalPrice * e?.quantity}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      sx={{
                        minWidth: '',
                        '& svg': {
                          fontWeight: 500,
                          fontSize: '24px'
                        }
                      }}
                    ><MdOutlineClose onClick={() => handleRemoveItem(e?.productId?._id)} /></Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* start table under md */}
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
                    fontSize={{ xs: '14px', xxs: '16px' }}
                    width={{ xs: 80, xxs: 150, sm: 200 }}
                  >{e?.productId?.name?.split(' ').slice(0, 8).join(' ')}...</Typography></Link>
                <Button
                  sx={{
                    minWidth: '',
                    '& svg': {
                      fontWeight: 500,
                      fontSize: '20px !important'
                    }
                  }}
                ><MdOutlineClose onClick={() => handleRemoveItem(e?.productId?._id)} /></Button>
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
                  }
                }}
              >
                <Typography
                  textAlign={'start'}
                  fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
                >قيمت واحد</Typography>
                <Typography>{e?.productId?.finalPrice}</Typography>
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
                  '& .quantityChanger button': {
                    padding: { xs: '2px', xxs: '4px' },
                    '& svg': {
                      fontSize: { xs: '16px', xxs: '20px' }
                    }
                  },
                  '& .quantityChanger': {
                    gap: { xs: '0', xxs: '4px' }
                  }
                }}
              >
                <Typography
                  textAlign={'start'}
                  fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
                >تعداد</Typography>
                <QauntityBox productId={e?.productId?._id} />
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
                  }
                }}
              >
                <Typography
                  textAlign={'start'}
                  fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
                >مجموع قيمت</Typography>
                <Typography>{e?.productId?.finalPrice * e?.quantity}</Typography>
              </Stack>

            </Stack>
          </Stack>
        ))}
        {/* end table under md */}
        {/* end table */}

        {/* start final price */}
        <Stack
          width={{ xs: '100%', xxs: '80%', sm: '50%', md: '40%', lg: '24%' }}
          height={'fit-content'}
          boxShadow={'0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'}
          border={'1px solid rgba(0,0,0,.1)'}
          borderRadius={'4px'}
          p={'0 24px'}
          my={{ xs: 2, md: 0 }}
        >
          <Typography
            borderBottom={'1px solid rgba(0,0,0,.2)'}
            lineHeight={'48px'}
            fontSize={'20px'}
            fontWeight={500}
          >صورتحساب</Typography>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            mt={1}
          >
            <Typography>تعداد اقلام</Typography>
            <Typography color='secondary'>{totalQuantity} عدد</Typography>
          </Stack>

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            mt={1}
            mb={2}
          >
            <Typography>قيمت نهايي</Typography>
            <Typography color='secondary'>{cart?.totalPrice || 0} تومان</Typography>
          </Stack>
          <Button
            onClick={handleCheckCartItems}
            sx={{
              borderRadius: '4px',
              bgcolor: "var(--third-clr)",
              color: 'var(--primary-clr)',
              padding: '8px 5px 8px 16px ',
              mb: '16px',
              transition: "all .5s",
              '&:hover': { bgcolor: "var(--secondary-clr)", color: 'var(--text-clr)' }
            }}

          >
            <Typography fontSize={{ xs: '12px', xxs: '14px', sm: '16px' }} fontWeight={500} mr={1}>پرداخت</Typography> </Button>
        </Stack>
        {/* end final price */}


      </Stack>
    </Stack>
  )
}
