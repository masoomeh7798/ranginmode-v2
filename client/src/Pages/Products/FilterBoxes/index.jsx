import { Box, List, ListItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { getCat, getBrand } from "../../../Store/Slices/FiltersSlice"



export default function FilterBoxes() {
    const dispatch = useDispatch()
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCat, setSelectedCat] = useState('');

    // get brands and categories for aside
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'category')
                const data = await res.json()
                setCategories(data?.data)

                const resB = await fetch(import.meta.env.VITE_BASE_API + 'brand')
                const dataB = await resB.json()
                setBrands(dataB?.data)

            } catch (error) {
                console.log(error);
            }
        })()

    }, []);


    return (
        <Stack
            display={{ xs: 'none', xl: 'flex' }}
            direction={{ xs: 'row', xl: 'column' }}
            width={{ xs: '100%', xl: '19%' }}
            justifyContent={{ xs: 'space-between', xl: 'start' }}
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
                     <ListItem
                            sx={{
                                '& svg': { color: 'var(--secondary-clr)' },
                                px: 0,
                                '& label': { marginRight: 0 },
                                '& label span:first-of-type': {
                                    padding: "0 !important",
                                    marginLeft: '4px !important'
                                }
                            }}

                        >
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={() => { setSelectedCat('all'), dispatch(getCat('all')) }}
                                    checked={selectedCat == 'all'}
                                />}
                                label={'همه دسته ها'} />
                        </ListItem>

                    {categories?.map(e => (
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

                        >
                            <FormControlLabel
                                control={<Checkbox

                                    onChange={() => { setSelectedCat(e?._id), dispatch(getCat(e?.title == 'همه دسته ها' ? 'all' : e?._id)) }}
                                    checked={selectedCat == e?._id}

                                />}
                                label={e?.title} />
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
                    <ListItem
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
                        checked={selectedBrand == 'all'}
                        onChange={() => { setSelectedBrand('all'), dispatch(getBrand('all')) }}
                    />} label={'همه برند ها'} />
                    </ListItem>
                    {brands?.map(e => (
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
                            checked={selectedBrand == e?._id}
                            onChange={() => {setSelectedBrand(e?._id), dispatch(getBrand(e?._id)) }}
                        />} label={e?.title} />
                        </ListItem>
                    ))}

                </List>
            </Box>
            {/* end brands */}
        </Stack>
    )
}
