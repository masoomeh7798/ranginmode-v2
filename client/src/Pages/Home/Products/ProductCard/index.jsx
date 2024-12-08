import React, { useEffect } from 'react'
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box, Button, IconButton, Rating, Skeleton, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import ProductModal from '../ProductModal';
import './style.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckFavorite } from '../../../../Store/Slices/FavoriteSlice';
import notify from "../../../../Utils/notify"


export default function ProductCard({ img, discount, finalPrice, price, name, description, brand, rating, variants, dynamicWidth, id }) {
    const [open, setOpen] = useState(false);
    const { token, user } = useSelector(state => state.auth)
    const [isFavorite, setIsFavorite] = useState(false);
    const { checkFavorite } = useSelector(state => state.favorite)
    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckFavorite = () => {
        dispatch(setCheckFavorite(!checkFavorite))
    }

    useEffect(() => {
        if (user && token) {
            (async () => {
                try {
                    const res = await fetch(import.meta.env.VITE_BASE_API + `user/${user?.id}`, {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setIsFavorite(data?.data?.user?.favoriteProductIds.includes(id) && true)
                    }
                } catch (error) {
                    // console.log(error);
                }
            })()
        } else {
            return
        }

    }, [checkFavorite]);


    const handleCheckIsFavorite = async () => {
        if (user && token) {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `product/favorite/${id}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ isFavorite })

                });
                const data = await res.json();
                if (data?.success) {
                    setIsFavorite(data?.isFavorite)
                    handleCheckFavorite()
                    notify('success', data?.message)
                } else {
                    notify('error', 'بايد ابتدا وارد سايت شويد.')
                }
            } catch (error) { }
        } else {
            notify('error', 'بايد ابتدا وارد سايت شويد.')

        }
    }



    const handleAddToRecentProduct = async (e) => {
        if (user && token) {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `product/${id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

            } catch (error) {
                // console.log(error);
            }
        }
    }



    return (
        <> <Card sx={{ height: `${dynamicWidth == '100% !important' ? '240px' : '450px'}`, width: `${dynamicWidth ? dynamicWidth : '250px'}`, position: 'relative', '&:hover .screen-heart': { visibility: 'visible', opacity: '1', right: '10px' }, '&:hover': { boxShadow: '0 0 5px 2px rgba(0,0,0,0.2)' } }}>
            <Box className={`${dynamicWidth == '100% !important' && 'card-product-full'}`} sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', overflow: 'hidden', alignItems: 'start' }}>
                <Box width={'100%'} height={`${dynamicWidth == '100% !important' ? '100%' : '48%'}`} overflow={'hidden'}>
                    <CardMedia sx={{ '&:hover': { transform: 'scale(1.1)' }, transition: ' all .5s ease-in-out', cursor: 'pointer' }}
                        component="img"
                        image={import.meta.env.VITE_BASE_URL + `${img[0]}`}
                        height={'100%'}
                        alt={name}

                    />
                </Box>
                <CardContent className='card-content' sx={{ width: '100%' }}>
                    <Box height={'90px'} width={'100%'}>
                        <Typography fontSize={'1.5em'} gutterBottom variant="h5" component="div">
                            {name?.split(' ').slice(0, 3).join(' ')}
                        </Typography>
                        <Typography variant="body2" >
                            {description.split(' ').slice(0, 5).join(' ')}...
                        </Typography>
                    </Box>
                    <Rating
                        readOnly
                        value={rating}
                        precision={0.5}
                        sx={{ direction: 'ltr' }}
                    />


                    <Stack width={'100%'} direction={'row'} justifyContent={'start'} alignItems={'center'} gap={2}>
                        <Typography fontSize={{ xs: '16px', lg: '12px', xl: '14px' }} sx={{ textDecoration: 'line-through' }}>{price} تومان</Typography>
                        <Typography color='secondary' fontSize={{ xs: '18px', lg: '16px', xl: '16px' }}>{finalPrice} تومان</Typography>
                    </Stack>
                    <Stack mt={'16px'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <Button onClick={handleAddToRecentProduct} href={`/product-details/${id}/${name?.replaceAll(' ', '-')}`} target='_blank' sx={{ bgcolor: 'var(--third-clr)', px: '16px' }} >مشاهده محصول</Button>
                    </Stack>
                </CardContent>
            </Box>

            <Typography sx={{ position: 'absolute', backgroundColor: 'var(--secondary-clr)', color: 'var(--text-clr)', borderRadius: '4px', top: '10px', left: '10px', padding: '4px 8px' }} variant='body2' >{discount}%</Typography>
            <Stack className='screen-heart' sx={{ position: 'absolute', top: '10px', right: '0px', '& button:hover': { bgcolor: 'var(--secondary-clr) !important', color: 'var(--text-clr) !important' }, '& button:last-child': { bgcolor: 'var(--text-clr)', color: 'var(--secondary-clr)', transition: 'all .3s' }, visibility: 'hidden', opacity: '0', transition: ' all .5s ease-in-out' }} gap={1}>
                <IconButton sx={{
                    bgcolor: isFavorite ? 'var(--secondary-clr) ' : 'var(--text-clr)',
                    color: isFavorite ? 'var(--text-clr) ' : 'var(--secondary-clr) '
                }}
                    onClick={handleCheckIsFavorite}
                ><FaRegHeart /></IconButton>
                <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={handleClickOpen}><BsArrowsFullscreen /></IconButton>
            </Stack>
        </Card>



            {open && <ProductModal
                id={id}
                name={name}
                description={description}
                variants={variants}
                brand={brand}
                rating={rating}
                price={price}
                finalPrice={finalPrice}
                discount={discount}
                img={img}
                handleClose={handleClose}
                open={open} />}
        </>
    )
}

