import { Box, IconButton, Pagination, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductCard from '../../Home/Products/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCat, getBrand } from "../../../Store/Slices/FiltersSlice"
import { isString } from 'formik';


// const cardWidth = { xs: '100%', sm: '48%', md: '32%', xl: '23.5%' }

export default function ProductsPart() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [showItem, setShowItem] = useState('');
  const [showCatItem, setShowCatItem] = useState('');
  const [showBrandItem, setShowBrandItem] = useState('');
  const [sort, setSort] = useState('');

  const dispatch = useDispatch()

  const handleShowItem = (e) => {
    setShowItem(e.target.value);
    setSort(e.target.value)
  };
  const handleShowCatItem = (e) => {
    setShowCatItem(e.target.value);
    dispatch(getCat(e.target.value))
  };
  const handleShowBrandItem = (e) => {
    setShowBrandItem(e.target.value);
    dispatch(getBrand(e.target.value))
  };

  const { cat, brand } = useSelector((state) => state.filters)
  const { id } = useParams()
  const catId = cat ? cat : id


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `product?limit=8&page=${currentPage}&sort=${sort}${catId == "all" ? "" : `&filters[categoryId][$in]=${catId}`}${brand == "all" || !brand ? "" : `&filters[brandId][$eq]=${brand.toString()}`}`)
        const data = await res.json()
        setProducts(data?.data)
        setCount(data?.count || 1)
      } catch (error) {
        console.log(error);
      }
    })()

  }, [currentPage, cat, brand, sort]);

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


  const items = products?.map((e, index) => (
    <Box
      key={index}
    // height={{ xs: '450px', xxs: '450px', sm: '450px' }}
    >
      <ProductCard
        id={e._id}
        name={e?.name}
        description={e?.description}
        brand={e?.brandId?.title}
        images={e?.images}
        productVariantIds={e?.productVariantIds}
      />
    </Box>
  ))

  return (
    <Stack
      width={{ xs: '100%', xl: '79%' }}
    >
      {/* start banner */}
      <Box
        sx={{
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom'
          }
        }}
        display={{ xs: 'none', xl: 'block' }}
        borderRadius={'16px'}
        height={300}
        width={'100%'}
        overflow={'hidden'}
      >
        <img src="/Leonardo_Phoenix_Create_a_horizontal_image_with_a_luxurious_bl_0.jpg" alt="banner" />

      </Box>
      {/* end banner */}

      {/* start products part */}
      <Stack>
        {/* start top select part */}
        <Stack
          direction={'row'}
          bgcolor={'#F1F1F1'}
          border={'1px solid rgba(0,0,0,.2)'}
          p={{ xs: '8px', sm: '8px 16px' }}
          borderRadius={{ xs: '4px', sm: 2, md: 3 }}
          mt={'10px'}
          alignItems={'center'}
          justifyContent={'start'}
          gap={'1.5%'}
          sx={{
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {/* start select sort type */}
          <Stack>
            <FormControl sx={{ minWidth: 120, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">مرتب سازي</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={showItem}
                label="مرتب سازي"
                onChange={handleShowItem}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      maxHeight: '200px'
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <em>هيچكدام</em>
                </MenuItem>
                <MenuItem value={"-createdAt"}>جديدترين</MenuItem>
                <MenuItem value={"-price"}>بيشترين قيمت</MenuItem>
                <MenuItem value={"price"}>كمترين قيمت</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {/* end select sort type */}

          {/* start select cat */}
          <Stack
            display={{ xl: 'none' }}
          >
            <FormControl sx={{ minWidth: 120, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">دسته بندي</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={showCatItem}
                label="دسته بندي"
                onChange={handleShowCatItem}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      maxHeight: '200px'
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <em>همه</em>
                </MenuItem>
                {categories?.map(e => (
                  <MenuItem key={e?._id} value={e?.title == 'همه دسته ها' ? 'all' : e?._id}>{e?.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {/* end select cat */}

          {/* start select brand */}
          <Stack
            display={{ lg: 'none' }}
          >
            <FormControl sx={{ minWidth: 90, maxWidth: 100 }} size="small">
              <InputLabel id="demo-select-small-label">برند</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={showBrandItem}
                label="برند"
                onChange={handleShowBrandItem}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      maxHeight: '200px'
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <em>همه</em>
                </MenuItem>
                {brands?.map(e => (
                  <MenuItem key={e?._id} value={e?.title == 'همه برند ها' ? 'all' : e?._id}>{e?.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {/* end select brand */}
        </Stack>
        {/* end top select part */}

        {/* start display products */}
        <Stack
          sx={{
            '& > div': {
              width: { xs: '100%', sm: '49%', md: '32.5%', lg: '23.5%' },
              mb: '10px'
            }
          }}
          direction={'row'}
          flexWrap={'wrap !important'}
          justifyContent={{ xs: 'center', lg: 'start' }}
          width={'100%'}
          gap={{ xxs: '5px', sm: '10px', lg: '20px' }}
          mt={'10px'}
        >
          {items}
        </Stack>
        {/* end display products */}

        {/* start pagination part */}
        <Stack
          width={'100%'}
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
          my={{ xs: '16px', sm: "24px", xl: '32px' }}

        >
          <Pagination
            page={currentPage}
            onChange={(e, value) => setCurrentPage(Number(value))}
            count={Math.ceil(count / 8)}
            sx={{
              direction: 'ltr',
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: 'var(--third-clr) !important', 
              }
            }}
            color="secondary"
          />

        </Stack>
        {/* end pagination part */}
      </Stack>
      {/* end products part */}

    </Stack >
  )
}
