import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ProductSlider from '../ProductSlider';
import { Box, Stack, Typography } from '@mui/material';
import { IoMdCart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import QuantityBox from '../../../../Components/QuantityBox'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCheckFavorite } from '../../../../Store/Slices/FavoriteSlice';
import notify from '../../../../Utils/notify';
import ChooseVariants from '../../../../Components/ChooseVariant/index.jsx';
import Variants from '../../../../Components/Variants/index.jsx';
import AddToCart from '../../../../Components/AddToCart/index.jsx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const useDynamicQuantity = (initialValue = 0) => {
    const [dynamicQuantity, setdynamicQuantity] = useState(initialValue);

    const handleDynamicQuantity = (q) => {
        setdynamicQuantity(q);
    };

    return { dynamicQuantity, handleDynamicQuantity };
};


export default function ProductModal({ handleClose, open, images, productVariantIds, name, description, brand, id }) {
    // const [dynamicQuantity, setdynamicQuantity] = useState(0);
    const { dynamicQuantity, handleDynamicQuantity }=useDynamicQuantity()
    const [isFavorite, setIsFavorite] = useState(false);
    const { token, user } = useSelector(state => state.auth)
    const { checkFavorite } = useSelector(state => state.favorite)
    const dispatch = useDispatch()

    const handleCheckFavorite = () => {
        dispatch(setCheckFavorite(!checkFavorite))
    }
    // const handleDynamicQuantity = (q) => {
    //     setdynamicQuantity(q)
    // }
   

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
                if (data?.success && res.ok) {
                    setIsFavorite(data?.isFavorite)
                    handleCheckFavorite()
                } else {
                    notify('error', 'بايد ابتدا وارد سايت شويد.')
                }
            } catch (error) {
            }
        } else {
            notify('error', 'بايد ابتدا وارد سايت شويد.')
        }
    }

    // strat variants
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState(productVariantIds[0]?._id);

    const handleSelectedVariant = (index, variantId) => {
        setSelectedVariant(index)
        setSelectedVariantId(variantId)
    }


    return (
        <BootstrapDialog sx={{
            '& .MuiDialog-paper': {
                padding: ' 0px 2%',
                maxWidth: '100%',
                width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' }
            },
            width: '100%',
            display: { xs: 'none', sm: 'block' },
            '& .MuiDialogContent-root': { padding: '0' }
        }}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle position={'static'} borderBottom={'1px solid rgba(0,0,0,.2)'} sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
                <Typography variant='body2' fontSize={'1.2em'}>{name}</Typography>

                <Stack direction={'row'} alignItems={'center'} gap={3} >
                    <Typography variant='body2'>برند: {brand}</Typography>
                </Stack>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    left: 24,
                    top: 16,
                    color: 'var(--secondary-clr-dark)',
                    backgroundColor: 'var(--text-clr)',
                    transition: 'all .5s',
                    '&:hover': {
                        color: 'var(--text-clr)',
                        backgroundColor: 'var(--secondary-clr-dark)'
                    }
                }}
            >
                <CloseIcon />
            </IconButton>
            <Stack direction={'row'} height={'100%'} alignItems={'center'} py={'20px'} >
                <DialogContent sx={{ height: '100%', width: '100%' }} >
                    <Stack direction={{ xs: 'column', md: 'row' }} height={'fit-content'} gap={{ xs: '20px', md: '3%' }} >
                        {/* start product slider */}
                        <Stack width={{ xs: "100%", md: '48.5%' }}>
                            <ProductSlider images={images} />
                        </Stack>
                        {/* end product slider */}

                        {/* start product info */}
                        <Stack width={{ xs: "100%", md: '48.5%' }} gap={2} alignItems={'start '}>
                            {/* start variants */}
                            <Variants productVariantIds={productVariantIds} selectedVariant={selectedVariant} />
                            {/* end variants */}
                            <Box mb={2}>
                                <Typography textAlign={'justify'} fontSize={{ xs: '12px', sm: '16px' }}>{description}</Typography>
                            </Box>
                            <Box display={'flex'} gap={1}>
                                <ChooseVariants productVariantIds={productVariantIds} handleSelectedVariant={handleSelectedVariant} selectedVariant={selectedVariant} />
                            </Box>
                            {/* start add to cart btn & quantity */}
                            <Stack direction={{ md: 'row' }} sx={{ width: '100%' }} alignItems={'center'} gap={2} >
                                <QuantityBox
                                    handleDynamicQuantity={handleDynamicQuantity}
                                    dynamicQuantity={dynamicQuantity}
                                    variantId={selectedVariantId}
                                    productId={id}
                                />
                                <AddToCart
                                    dynamicQuantity={dynamicQuantity}
                                    variantId={selectedVariantId}
                                    productId={id}
                                />

                            </Stack>
                            {/* start add to cart btn & quantity */}

                            <Stack direction={'row'} sx={{ width: '100%' }} justifyContent={{ xs: "center", md: 'start' }} alignItems={'center'} gap={2} mt={'20px'}>
                                <Button
                                    onClick={handleCheckIsFavorite}
                                    sx={{
                                        '& svg': { fontSize: "16px !important" }, borderRadius: '24px',
                                        bgcolor: isFavorite ? "var(--secondary-clr)" : "transparent", color: isFavorite ? 'var(--text-clr)' : 'var(--primary-clr)', py: '4px', paddingLeft: '16px !important', transition: "all .5s", border: '1px solid rgba(0,0,0,.1)', '&:hover': { bgcolor: isFavorite ? "var(--secondary-clr)" : "var(--text-clr)" }
                                    }} startIcon={<IoMdHeartEmpty />}><Typography fontSize={'12px'} fontWeight={400} mr={1}>دوستش دارم</Typography> </Button>

                            </Stack>
                        </Stack>
                        {/* end product info */}
                    </Stack>
                </DialogContent>
            </Stack>

        </BootstrapDialog >



    );
}

