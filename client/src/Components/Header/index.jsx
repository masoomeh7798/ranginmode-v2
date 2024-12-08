import { Badge, Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu';


export default function Header() {
  const [isOpenCat, setIsOpenCat] = useState(false);
  const handleOpenCat = () => {
    setIsOpenCat(isOpenCat ? false : true)
  }
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + 'category')
        const data = await res.json()
        setCategories(data?.data?.categories)

      } catch (error) {
        console.log(error);
      }
    })()

  }, []);

  return (
    <header style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', position: 'relative' }}>
      <MegaMenu handleOpenCat={handleOpenCat} isOpenCat={isOpenCat} categories={categories} />
      {/* start top strip */}
      <Box py={1} bgcolor={'var(--secondary-clr)'} align='center'><Typography variant='body1' fontWeight={'500'} fontSize={'16px'} color='var(--text-clr)'>"عرضه به روزترين بدليجات برند و استيل ."</Typography>
      </Box>
      {/* end top strip */}
      {/* strat navbar */}
      <Navbar handleOpenCat={handleOpenCat} isOpenCat={isOpenCat} categories={categories} />
      {/* end navbar */}


    </header>
  )
}
