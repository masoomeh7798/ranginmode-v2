import React, { useEffect, useState } from 'react'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box, Button, Stack, Typography } from '@mui/material';
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '@mui/icons-material';
import notify from "../../../../Utils/notify"
import { IoMdLogOut } from "react-icons/io";
import {logout} from "../../../../Store/Slices/AuthSlice"

export default function TopNav() {
  const { token, user } = useSelector(state => state.auth)
  const { isAdded, isRemoved } = useSelector(state => state.cart)
  const [cartItems, setCartItems] = useState(0);
  const [searchData, setSearchData] = useState();
  const [searchContent, setSearchContent] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  const dispatch=useDispatch()

  const handleLogout=()=>{
    isLogout && dispatch(logout())
  }

  const handleSearch = async (e) => {
   setSearchContent(e.target.value)
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'search', {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ query: e?.target?.value?.trim() })
        })
        const data = await res.json()
        setSearchData(data)
      } catch (error) {
        console.log(error);
      }
    
  }


  useEffect(() => {
    if (token && user) {
      (async () => {
        try {
          const res = await fetch(import.meta.env.VITE_BASE_API + `user/${user?.id}`, {
            "method": "GET",
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          const data = await res.json()
          setCartItems(data?.data?.user?.cart?.items?.length)
        } catch (error) {
          console.log(error);
        }
      })()
    } else {
      return
    }
  }, [isRemoved, isAdded]);


  return (
    <Stack alignItems={'center'} direction={'row'} my={{ xs: 2, md: 3 }} gap={1}>
      <Stack flex={1} display={{ xs: 'inline-block', sm: 'none' }}>
        <IconButton>
          <HiOutlineMenu color='var(--primary-clr)' opacity={'.7'} />
        </IconButton>
      </Stack>

      {/* start logo section */}
      <Link style={{ flex: 1 }} to='/'><Stack alignItems={'center'} gap={{ xs: 1, md: 2 }} direction={'row'} >
        <Box width={{ md: '45px', xs: "35px" }} height={{ md: '45px', xs: "35px" }}>
          <img width={'100%'} height={'100%'} src='/logoland3 (1).png' />
        </Box>
        <Typography noWrap color='var(--primary-clr)' fontSize={{ xs: "24px", md: '32px' }} fontWeight={'600'} component={'h1'}>رنگين مد</Typography>
      </Stack></Link>
      {/* end logo section */}
      {/* strat search bar */}
      <Stack position={'relative'} display={{ xs: 'none', sm: 'flex' }} bgcolor={'var(--text-clr)'} justifyContent={'space-between'} px={1} flex={2} alignItems={'center'} direction={'row'} border={'1px solid rgba(0,0,0,0.2)'} borderRadius={2}>
        <InputBase onChange={handleSearch} sx={{ flexGrow: 1, mr: 3, color: 'rgba(0,0,0,.7)' }}
          placeholder="محصولي كه ميخواي اينجا پيدا كن..."
          inputProps={{ 'aria-label': 'search' }}
        />

        <IconButton onClick={() => { if (!searchData?.success || !searchContent) { notify('error', 'محصول يافت نشد :(') } }} sx={{ p: '10px' }} type="button" aria-label="search">
          <SearchIcon fontSize='medium' color='var(--primary-clr)' />
        </IconButton>
        {searchData?.success &&
          <Stack
            className='search-dropdown'
            maxHeight={'300px'}
            direction={'row'}
            alignItems={'start'}
            gap={{ sm: 3, md: 4, lg: 5 }}
            position={'absolute'}
            top={'110%'}
            right={0}
            bgcolor={'var(--text-clr)'}
            zIndex={20}
            border={'1px solid rgba(0,0,0,.2)'}
            borderRadius={2}
            p={'16px 24px'}
            sx={{
              '& a': {
                color: 'var(--primary-clr)',
                fontSize: '14px',
                '&:hover': {
                  color: 'var(--secondary-clr)'
                }
              },
              overflowY: 'scroll'
            }}
          >
            {searchData?.data?.product.length != 0 &&
              <Stack>
                <Typography
                  fontWeight={500}
                  color='secondary'
                  sx={{
                    opacity: .8,
                    textWrap:'nowrap'
                  }}
                >در محصولات:</Typography>
                {searchData?.data?.product?.map((e, index) => (
                  <Link to={`/product-details/${e?._id}/${e?.name?.replaceAll(' ', '-')}`} target='_blank' key={index}
                    style={{
                      lineHeight: '32px'
                    }}
                  >{e?.name}</Link>
                ))}
              </Stack>
            }
            {searchData?.data?.category?.length != 0 &&
              <Stack>
                <Typography
                  fontWeight={500}
                  color='secondary'
                  sx={{
                    textWrap: 'nowrap',
                    opacity: .8
                  }}
                >در دسته بندي ها:</Typography>
                {searchData?.data?.category?.map((e, index) => (
                  <Link to={`/products/${e?._id}/${e?.title?.replaceAll(' ', '-')}`} target='_blank' key={index}
                    style={{
                      lineHeight: '32px'
                    }}
                  >{e?.title}</Link>
                ))}
              </Stack>
            }
            {/* {searchData?.data?.brand?.length != 0 &&
              <Stack>
                <Typography
                  fontWeight={500}
                  color='secondary'
                  sx={{
                    opacity: .8
                  }}
                >در برند ها:</Typography>
                {searchData?.data?.brand?.map((e, index) => (
                  <Link to={`/products/${e?._id}/${e?.title?.replaceAll(' ','-')}`} target='_blank' key={index}
                    style={{
                      lineHeight: '32px'
                    }}
                  >{e?.title}</Link>
                ))}
              </Stack>
            } */}
          </Stack>}
      </Stack>
      {/* end search bar */}
      {/* start user and cart part */}
      <Stack flex={1} justifyContent={'end'} gap={{ xs: 1, sm: 2, md: 4 }} alignItems={'center'} direction={'row'}>
        {token ? (
          <IconButton
            onMouseEnter={() => setIsLogout(true)}
            onMouseLeave={() => setIsLogout(false)}
            onClick={handleLogout}
            sx={{
              width: { xs: '40px', md: '50px' },
               height: { xs: '40px', md: "50px" },
              transition: 'all .5s',
              boxShadow: 'inset 0 0 5px 2px rgba(0,0,0,.2)',
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': {
                bgcolor: 'var(--secondary-clr-light)',
              },
              '& svg.logout-svg': {
                fontWeight: 800,
                transform: 'scale(1.2)'
              }
            }}
          >
            <Person
              style={{
                position: 'absolute',
                transition: 'opacity 0.5s ',
                opacity: isLogout ? 0 : 1,
                width: '60%',
                height: '60%'
              }}
            />
            <IoMdLogOut
              style={{
                position: 'absolute',
                transition: 'opacity 0.5s ',
                opacity: isLogout ? 1 : 0,
                width: '50%',
                height: '50%'
              }}
              className='logout-svg' />
          </IconButton>
        ) :
          (<Button href='/auth' sx={{ borderRadius: 2, px: 2, py: 1, bgcolor: 'var(--secondary-clr)', display: { xs: 'none', sm: 'inline-block' }, '&:hover': { bgcolor: 'var(--secondary-clr-dark)' } }}>
            <Typography fontSize={{ xs: '12px', sm: "16px" }} noWrap color='var(--text-clr)' component={'p'}>ورود/ ثبت نام</Typography>
          </Button>)}

        <Link to='/cart' mt={'-1px'}>
          <IconButton sx={{ bgcolor: "var(--text-clr)", '&:hover': { bgcolor: 'var(--secondary-clr-light)' }, width: { xs: '40px', md: '50px' }, height: { xs: '40px', md: "50px" }, p: 0, boxShadow: 'inset 0 0 5px 2px rgba(0,0,0,.2)' }}>
            <Badge badgeContent={cartItems} max={9} color='secondary'>
              <ShoppingCartIcon sx={{ width: { xs: '1.2em', md: '1.5em' }, height: { xs: '1.2em', md: '1.5em' } }} color='var(--text-clr)' />
            </Badge>
          </IconButton>
        </Link>
      </Stack>
      {/* end user and cart part */}
    </Stack>
  )
}
