import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, Rating, Stack, Typography } from '@mui/material';
import ProductSlider from '../../Home/Products/ProductSlider'
import { IoMdCart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import QuantityBox from '../../../Components/QuantityBox'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckFavorite } from '../../../Store/Slices/FavoriteSlice';
import notify from '../../../Utils/notify';
import ChooseVariants from '../../../Components/ChooseVariant';
import Variants from '../../../Components/Variants';
import AddToCart from '../../../Components/AddToCart';


export default function ProductDetailsTop({ productId }) {
    const [product, setProduct] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const { token, user } = useSelector(state => state.auth)
    const { checkFavorite } = useSelector(state => state.favorite)
    const [dynamicQuantity, setdynamicQuantity] = useState(0);

    // strat variants
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState();
    const handleSelectedVariant = (index, variantId) => {
        setSelectedVariant(index)
        setSelectedVariantId(variantId)
    }

    const handleDynamicQuantity = (q) => {
        setdynamicQuantity(q)
    }

    const dispatch = useDispatch()

    const handleCheckFavorite = () => {
        dispatch(setCheckFavorite(!checkFavorite))
    }
    useEffect(() => {
        (async () => {
            try {
                const resC = await fetch(import.meta.env.VITE_BASE_API + `product/${productId}`)
                const dataC = await resC.json()
                if(dataC?.success){
                    setProduct(dataC?.data)
                    setSelectedVariantId(dataC.data.productVariantIds[0]?._id)
                }

                if (user && token) {
                    const res = await fetch(import.meta.env.VITE_BASE_API + `user/${user?.id}`, {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (res.ok) {

                        setIsFavorite(data?.data?.favoriteProductIds.includes(productId) && true)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })()

    }, [checkFavorite]);

    const handleCheckIsFavorite = async () => {
        if (user && token) {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `product/favorite/${productId}`, {
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
                } else {
                    notify('error', 'بايد ابتدا وارد سايت شويد.')
                }
            } catch (error) {
            }
        } else {
            notify('error', 'بايد ابتدا وارد سايت شويد.')

        }
    }



    return (
        (product.productVariantIds && product.productVariantIds.length != 0) ? (
            <Box
                boxShadow={'0 0 10px 2px rgba(0,0,0,.2)'}
                my={'10px'}
                borderRadius={2}
            >
                <DialogTitle position={'static'} borderBottom={'1px solid rgba(0,0,0,.2)'} sx={{ my: 0, py: 2, mx: '24px' }} id="customized-dialog-title" >
                    <Typography
                        variant='body2'
                        fontSize={{ xs: '1em', xxs: '1.2em' }}
                    >
                        {product?.name}
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', xxs: 'row' }}
                        alignItems={{ xs: "start", xxs: 'center' }}
                        gap={{ xs: 1, xxs: 3 }}
                        mt={1}
                    >
                        <Typography variant='body2'>برند: {product?.brandId?.title}</Typography>
                    </Stack>
                </DialogTitle>

                <Stack direction={'row'} height={'100%'} alignItems={'center'} py={'20px'} >
                    <DialogContent sx={{ height: '100%', width: '100%' }} >
                        <Stack direction={{ xs: 'column', md: 'row' }} height={'fit-content'} gap={{ xs: '20px', md: '3%' }} >
                            {/* start product slider */}
                            <Stack width={{ xs: "100%", md: '38.5%' }}>
                                <ProductSlider images={product?.images} />
                            </Stack>
                            {/* end product slider */}

                            {/* start product info */}
                            <Stack width={{ xs: "100%", md: '58.5%' }} gap={2} alignItems={'start '}>
                                {/* start variants */}
                                <Variants productVariantIds={product.productVariantIds} selectedVariant={selectedVariant} />
                                {/* end variants */}
                                <Box mb={2}>
                                    <Typography textAlign={'justify'} fontSize={{ xs: '12px', sm: '16px' }}>{product?.description}</Typography>
                                </Box>
                                <Box display={'flex'} gap={1}>
                                    <ChooseVariants productVariantIds={product?.productVariantIds} handleSelectedVariant={handleSelectedVariant} selectedVariant={selectedVariant} />
                                </Box>
                                {/* start add to cart btn & quantity */}
                                <Stack direction={{ md: 'row' }} sx={{ width: '100%' }} alignItems={'center'} gap={2} mt={7}>
                                    <QuantityBox
                                        handleDynamicQuantity={handleDynamicQuantity}
                                        dynamicQuantity={dynamicQuantity}
                                        variantId={selectedVariantId}
                                        productId={productId}
                                    />
                                    <AddToCart
                                        dynamicQuantity={dynamicQuantity}
                                        variantId={selectedVariantId}
                                        productId={productId}
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
            </Box>
        ) : (<></>)
    )
}
