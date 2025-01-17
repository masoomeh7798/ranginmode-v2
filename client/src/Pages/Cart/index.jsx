import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../Utils/notify';
import QauntityBoxCart from '../../Components/QuantityBoxCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { setIsChangedCartQuantity } from '../../Store/Slices/CartSlice';


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
  const { isChangedCartQuantity} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const guestId=localStorage.getItem('guestId')


  let totalQuantity = 0
  cart?.items?.map(e => {
    totalQuantity += e?.quantity
  })




  const handleRemoveItem = async (productId,variantId) => {
    let guestId = localStorage.getItem('guestId')
    const quantity = cart.items?.filter(e => (e.variantId._id == variantId && e.productId._id == productId))[0]?.quantity
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + 'cart', {
        "method": "DELETE",
        headers: {
          authorization: token ? `Bearer ${token}` : '',
          "content-type": "application/json"
        },
        body: JSON.stringify({ guestId, productId, variantId, quantity })
      })
      const data = await res.json()
      if (data?.success) {
        dispatch(setIsChangedCartQuantity())
        notify('success',data?.message)
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      let guestId = localStorage.getItem('guestId')
      if (!token && !guestId) {
        guestId = uuidv4()
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


  // check if the cart items still are the same
  const handleCheckCartItems = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + 'order', {
        "method": "POST",
        headers: {
          authorization: token ? `Bearer ${token}` : '',
            "content-type": "application/json"
        },
        body: JSON.stringify({ guestId })
      })
      const data = await res.json()
      if (data?.change) {
        setCart(data?.data)
        notify('success', data?.message)
        dispatch(setIsChangedCartQuantity())
      } else {
        navigate('/payment')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    ((guestId || token) && (cart?.items?.length > 0)) ?
    (
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
                <StyledTableCell align="center">قيمت واحد (ت)</StyledTableCell>
                <StyledTableCell align="center">تعداد</StyledTableCell>
                <StyledTableCell align="center">مجموع قيمت (ت)</StyledTableCell>
                <StyledTableCell align="center">حذف</StyledTableCell>
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
                    <QauntityBoxCart
                      productId={e?.productId?._id}
                      variantId={e?.variantId?._id}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{(e?.variantId?.finalPrice * e?.quantity)?.toLocaleString()}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      sx={{
                        minWidth: '',
                        '& svg': {
                          fontWeight: 500,
                          fontSize: '24px'
                        }
                      }}
                    ><DeleteForeverIcon onClick={() => handleRemoveItem(e?.productId?._id,e?.variantId?._id)} /></Button></StyledTableCell>
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
                  >{e?.productId?.name?.split(' ').slice(0, 8).join(' ')} - {e?.variantId?.name?.split(' ').slice(0, 8).join(' ')}</Typography></Link>
                <Button
                  sx={{
                    minWidth: '',
                    '& svg': {
                      fontWeight: 500,
                      fontSize: '20px !important'
                    }
                  }}
                ><DeleteForeverIcon onClick={() => handleRemoveItem(e?.productId?._id,e?.variantId?._id)} /></Button>
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
                <Typography>{e?.variantId?.finalPrice?.toLocaleString()}</Typography>
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
                <QauntityBoxCart
                 productId={e?.productId?._id} 
                 variantId={e?.variantId?._id} 
                 />
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
                <Typography>{(e?.variantId?.finalPrice * e?.quantity)?.toLocaleString()}</Typography>
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
          >
            <Typography>هزينه ارسال</Typography>
            <Typography color='secondary'>35,000 تومان</Typography>
          </Stack>

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            mt={1}
            mb={2}
          >
            <Typography>قيمت نهايي</Typography>
            <Typography color='secondary'>{(Number(cart?.totalPrice)+35000 || 0)?.toLocaleString()} تومان</Typography>
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
            <Typography fontSize={{ xs: '12px', xxs: '14px', sm: '16px' }} fontWeight={500} mr={1}>تاييد و ادامه</Typography>
          </Button>
        </Stack>
        {/* end final price */}


      </Stack>
    </Stack> ) : <Typography component={'h1'} textAlign={'center'} my={3} fontSize={32}>سبد خريد خالي است.</Typography>
  )
}
