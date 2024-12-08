import { Box, List, ListItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { useDispatch } from 'react-redux';
import {getPrice,getCat,getBrand} from "../../../Store/Slices/FiltersSlice"

function pricetext(price) {
    return `${price}`;
}


export default function FilterBoxes() {
    const dispatch=useDispatch()
    const [price, setPrice] = useState([400000, 600000]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    
    // get brands and categories for aside
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        (async()=>{
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'category')
                const data = await res.json()
                setCategories(data?.data?.categories)

                const resB = await fetch(import.meta.env.VITE_BASE_API + 'brand')
                const dataB = await resB.json()
                setBrands(dataB?.data?.brands)

            } catch (error) {
                console.log(error);
            }
        })()
        
    }, []);


    return (
        <Stack
            display={{xs:'none',sm:'flex'}}
            direction={{ xs: 'row', xl: 'column' }}
            width={{ xs: '100%', xl: '19%' }}
            justifyContent={{xs:'space-between',xl:'start'}}
        >
            {/* start categories */}
            <Box
                width={{ xs: '30%', xl: '100% !important' }}
                mb={{ xl: 4 }}
            >
                <Typography
                    variant='h6'
                    fontSize={'20px'}
                    fontWeight={500}
                    mb={2}
                >دسته بندي</Typography>
                <List
                    sx={{
                        overflowY: 'scroll',
                        height: '200px',
                        py: '0'
                    }}
                >
                    {categories?.map(e=>(
                         <ListItem 
                         key={e?._id}
                        sx={{
                            '& svg': { color: 'var(--secondary-clr)' },
                            px: 0,
                            '& label': { marginRight: 0 },
                            '& label span:first-of-type': {
                                padding: "0 !important",
                                marginLeft: '4px !important'
                            }
                        }}

                    ><FormControlLabel   control={<Checkbox
                        checked={selectedCat==e?._id}
                        onChange={()=>{setSelectedCat(e?._id),dispatch(getCat(e?._id))}}
                    />} label={e?.title} />
                    </ListItem>
                  
                    ))}
                  
                </List>
            </Box>
            {/* end categories */}

            {/* start brands */}
            <Box
                width={{ xs: '30%', xl: '100% !important' }}
                mb={{ xl: 4 }}
            >
                <Typography
                    variant='h6'
                    fontSize={'20px'}
                    fontWeight={500}
                    mb={2}
                >برند ها</Typography>
                <List
                    sx={{
                        overflowY: 'scroll',
                        height: '200px',
                        py: '0'
                    }}
                >
                  {brands?.map(e=>(
                         <ListItem 
                         key={e?._id}
                        sx={{
                            '& svg': { color: 'var(--secondary-clr)' },
                            px: 0,
                            '& label': { marginRight: 0 },
                            '& label span:first-of-type': {
                                padding: "0 !important",
                                marginLeft: '4px !important'
                            }
                        }}

                    ><FormControlLabel control={<Checkbox
                        checked={selectedBrand==e?._id}
                        onChange={(el)=>{setSelectedBrand(e?._id),dispatch(getBrand(e?._id))}}
                    />} label={e?.title} />
                    </ListItem>
                  ))}

                </List>
            </Box>
            {/* end brands */}


            {/* start price range */}
            <Box
                width={{ xs: '30%', xl: '100% !important' }}
                mb={2}
            >
                <Typography
                    variant='h6'
                    fontSize={'20px'}
                    fontWeight={500}
                    mb={2}
                >محدوده قيمت</Typography>
                <Slider
                    sx={{
                        '&.MuiSlider-colorPrimary': {
                            color: 'var(--secondary-clr) !important'
                        },
                        width: '100%'
                    }}
                    getAriaLabel={() => 'Price range'}
                    value={price}
                    valueLabelDisplay="auto"
                    getAriaValueText={pricetext}
                    min={20000}
                    max={1000000}
                    step={10000}
                    onChange={(event, newValue)=>{setPrice(newValue);dispatch(getPrice(newValue))}}
                />
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        '& p': {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    }}
                >
                    <Typography>تا: {price[1]} تومان</Typography>
                    <Typography>از: {price[0]} تومان</Typography>
                </Stack>
            </Box>
            {/* end price range */}
        </Stack>
    )
}
