import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function FeaturedCategories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'category?filters[isMain][$eq]=true')
                const data = await res.json()
                setCategories(data?.data?.categories)

            } catch (error) {
                console.log(error);
            }
        })()

    }, []);

    const items=categories?.map(e=>(
        <Link key={e?._id} to={`/products/${e?._id}/${e?.title.replaceAll(' ', '-')}`} target='_blank'>
        <Stack sx={{ '&:hover div': { boxShadow: ' 0 3px 6px rgba(0,0,0,.5),0 3px 6px rgba(0,0,0,.5)', transform: 'translateY(-5px)' }, '& div': { transition: 'all .3s' } }} alignItems={'center'} justifyContent={'center'} gap={1}>
            <Box width='120px' height={'120px'} borderRadius={'50%'} overflow={'hidden'}>
                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={import.meta.env.VITE_BASE_URL+`${e?.image}`} alt={e?.title} />
            </Box>
            <Typography fontWeight={500} color='primary'>{e?.title}</Typography>
        </Stack>
    </Link>
    )
    )

    return (

        <Stack direction={'column'} gap={2} my={3} sx={{overflowX:'scroll',
            '&::-webkit-scrollbar':{
                display:'none'
            }
        }}>
            <Typography fontSize={'1.5em'} fontWeight={400} component={'h3'}>دسته بندی های اصلی</Typography>
            <Stack gap={1} direction={'row'} justifyContent={'space-around'} sx={{ overflowX: 'scroll' ,overflow:'visible'}} >
                {items}
            </Stack>


        </Stack>
    )
}
