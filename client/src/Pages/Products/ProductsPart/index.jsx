import { Box, IconButton, Pagination, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BiSolidGrid } from "react-icons/bi";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductCard from '../../Home/Products/ProductCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// const cardWidth = { xs: '100%', sm: '48%', md: '32%', xl: '23.5%' }

export default function ProductsPart() {
  const [products, setProducts] = useState([]);
  const [dynamicWidth, setDynamicWidth] = useState('23.5%');
  const [activeGridIndex, setActiveGridIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [showItem, setShowItem] = useState('');
  const [sort, setSort] = useState('');
  
  const {price,cat,brand}=useSelector((state)=>state.filters)
  const {id}=useParams()
  const catId=cat?cat:id


  const handleShowItem = (e) => {
    setShowItem(e.target.value);
    setSort(e.target.value)
  };

  const handleChangeGrid = (width, index) => {
    setDynamicWidth(width)
    setActiveGridIndex(index)
  };
  // &filters[categoryId][$in]=${cat.toString()}

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `product?limit=8&page=${currentPage}&sort=${sort}&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}${catId=="all" ? "":`&filters[categoryId][$in]=${catId}`}${brand ? `&filters[brandId][$eq]=${brand.toString()}`:""}`)
        const data = await res.json()
        setProducts(data?.data?.products)
        setCount(data?.count || 1)
      } catch (error) {
        console.log(error);
      }
    })()

  }, [currentPage,price,cat,brand,sort]);

  console.log(sort);

  const items = products?.map((e, index) => (
    <ProductCard
      key={index}
      id={e._id}
      name={e?.name}
      description={e?.description}
      variants={e?.variants}
      brand={e?.brandId?.title}
      rating={e?.rating}
      price={e?.price}
      finalPrice={e?.finalPrice}
      discount={e?.discount}
      img={e.images}
      dynamicWidth={dynamicWidth} />
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
        <img src="/Leonardo_Phoenix_Create_a_horizontal_image_with_a_luxurious_bl_0.jpg" alt="" />

      </Box>
      {/* end banner */}

      {/* start products part */}
      <Stack>
        {/* start top select part */}
        <Stack
          direction={'row'}
          bgcolor={'#F1F1F1'}
          border={'1px solid rgba(0,0,0,.2)'}
          p={'8px 16px'}
          borderRadius={'16px'}
          mt={'10px'}
          justifyContent={'space-between'}
          display={{ xs: 'none', xl: 'flex' }}
        >

          {/* start select part */}
          <Stack>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">مرتب سازي</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={showItem}
                label="مرتب سازي"
                onChange={handleShowItem}
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
          {/* end select part */}
          {/* start grid part */}
          <Stack
            sx={{
              '& button:hover': {
                bgcolor: 'transparent'
              },
              '& button': {

              },
              '& svg': {
                fontSize: '1.2em',
                opacity: '.7',
                '&:hover': {
                  opacity: 1
                }
              }
            }}
            direction={'row'}
          >
            <IconButton onClick={() => handleChangeGrid('23.5% !important', 1)} sx={{
              '& svg': {
                transform: "scale(.8)",
                color: activeGridIndex == 1 && 'var(--secondary-clr)',
                opacity: activeGridIndex == 1 && 1

              }
            }}><TfiLayoutGrid4Alt /></IconButton>
            <IconButton sx={{
              '& svg': {
                color: activeGridIndex == 2 && 'var(--secondary-clr)',
                opacity: activeGridIndex == 2 && 1
              }
            }} onClick={() => handleChangeGrid('32% !important', 2)}><BiSolidGrid /></IconButton>
            <IconButton sx={{
              '& svg': {
                color: activeGridIndex == 3 && 'var(--secondary-clr)',
                opacity: activeGridIndex == 3 && 1
              }
            }} onClick={() => handleChangeGrid('100% !important', 3)} ><GiHamburgerMenu /></IconButton>
          </Stack>
          {/* end grid part */}
        </Stack>
        {/* end top select part */}

        {/* start display products */}
        <Stack
          sx={{
            '& > div': {
              width: { xs: '100%',xxs:'75%' , sm: '47%', md: '30%', xl: '23.5%' },
              mb: '10px'
            }
          }}
          direction={'row'}
          flexWrap={'wrap !important'}
          justifyContent={{ xs: 'center', lg: 'start' }}
          width={'100%'}
          gap={{ sm: '10px', lg: '20px' }}
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
              direction: 'ltr'
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
