import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import { Box } from '@mui/material'
import BottomNav from './BottomNav'

export default function Navbar({handleOpenCat,
    isOpenCat,categories}) {
     
    return (
        <nav >
            <Box  sx={{'& button':{transition:'all .3s ease-out'}}} width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} >
                {/* start top navbar */}
                <TopNav />
                {/* end top navbar */}
                {/* start bottom navbar */}
                <BottomNav handleOpenCat={handleOpenCat} isOpenCat={isOpenCat} categories={categories}/>
                {/* end bottom navbar */}
            </Box>
        </nav>
    )
}
