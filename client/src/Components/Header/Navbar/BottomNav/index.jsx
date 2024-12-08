import React, {  useState } from 'react'
import { Box, Button,  Stack, Typography } from '@mui/material'
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdWatch } from "react-icons/io";
import { GiHeartNecklace } from "react-icons/gi";
import { GiDoubleNecklace } from "react-icons/gi";
import { GiBigDiamondRing } from "react-icons/gi";
import { GiHeartEarrings } from "react-icons/gi";
import { FaRing } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import { FaHorseHead } from "react-icons/fa";
import { IoMdFlower } from "react-icons/io";
import { GiFootprint } from "react-icons/gi";
import { BsFillBox2HeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.css'




export default function BottomNav({handleOpenCat,categories}) {
    // all category btn
 
   

    // start tab categories
    const [tab, setTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    const tabCats = categories?.map((e,index) => {
        if (!e.subCategory) {
            return (
            
                    <Tab key={index} href={`/products/${e?._id}/${e?.title.replaceAll(' ', '-')}`} target='_blank'  sx={{
                        borderRadius: '16px',
                        px: { xs: '8px', md: '16px' },
                        '&:hover': { backgroundColor: 'var(--secondary-clr-light)' },
                    }}
                        label={
                            <Stack color={'var(--primary-clr)'}
                                direction={'row'}
                                gap={.8}
                                justifyContent={'space-between'}
                                sx={{
                                    '& span': {
                                        textWrap: 'nowrap',
                                        fontSize: '15px'
                                    }
                                }}
                            >
                                {e?.title == "ساعت" ? <IoMdWatch /> :
                                    e?.title == "گردنبند" ? <GiHeartNecklace /> :
                                        e?.title == "سرويس" ? <GiDoubleNecklace /> :
                                            e?.title == "انگشتر" ? <GiBigDiamondRing /> :
                                                e?.title == "گوشواره" ? <GiHeartEarrings /> :
                                                    e?.title == "دستبند" ? <FaRing /> :
                                                        e?.title == "بند عينك" ? <FaGlasses /> :
                                                            e?.title == "آويز و جاكليدي" ? <FaHorseHead /> :
                                                                e?.title == "گلسر" ? <IoMdFlower /> :
                                                                    e?.title == "پابند" ? <GiFootprint /> :
                                                                        e?.title == "باكس و جعبه" ? <BsFillBox2HeartFill /> :
                                                                            null}
                                <span>{e?.title}</span>

                            </Stack>

                        }
                    />



            )
        }
    })



    return (
        <Stack sx={{ overflowX: 'scroll', '::-webkit-scrollbar': { display: 'none' }, overflow: 'visible' }} alignItems={'start'} direction={'row'} mt={{ xs: 2, md: 3 }} mx={'auto'} gap={3} my={1}>

            {/* start all category */}
            <Box display={{ xs: 'none', md: 'inline-block' }} borderRadius={'8px'} zIndex={'10'}>
                <Button onClick={handleOpenCat} sx={{ py: '12px', display: 'flex', gap: '16px', bgcolor: 'var(--secondary-clr)', '&:hover': { bgcolor: 'var(--secondary-clr-dark)' }, '& svg': { color: 'var(--text-clr)' } }} startIcon={<IoIosMenu size={24} />} endIcon={<IoIosArrowDown size={22} />}>
                    <Typography fontSize={'16px'} color='var(--text-clr)' noWrap>همه دسته ها</Typography>
                </Button>
            </Box>
            {/* end all category */}

            {/* start tab categories */}
            <Box
                className='catTabNav'
            >
                <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}
                >
                    {tabCats}

                </Tabs>
            </Box>
            {/* end tab categories */}
        </Stack>
    )
}