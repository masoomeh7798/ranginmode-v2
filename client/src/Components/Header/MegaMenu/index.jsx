import React, { useEffect, useState } from 'react'
import { Box, Button, List, ListItem, Stack, Typography } from '@mui/material'
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

export default function MegaMenu({handleOpenCat,
    isOpenCat,categories}) {
        const catItemsInAllcats = categories?.map((e,index) => {
            if (!e.subCategory) {
                const subCats = categories?.filter(subCat => subCat?.subCategory?._id == e?._id)?.map(subCat => (
                    <Button
                        key={subCat?._id}
                        sx={{ textWrap: 'nowrap', color: 'var(--primary-clr)', fontSize: '14px', fontWeight: 400, borderRadius: '16px', mt: { md: 1, lg: 2 } }}
                        href={`/products/${subCat?._id}/${subCat?.title.replaceAll(' ', '-')}`}
                        disableRipple
                        target='_blank'
                        className='sub-menu'>{subCat?.title}
                    </Button>
                )
                )
    
                return (
                    <ListItem key={index} sx={{
                        borderRadius: '16px',
                        textWrap: 'nowrap',
                        px: { md: '8px', lg: '16px' },
                        '&:hover': { backgroundColor: 'var(--secondary-clr-light)' },
                        position: 'relative'
                    }}>
                        <Button href={`/products/${e?._id}/${e?.title.replaceAll(' ', '-')}`}
                            disableRipple
                            target='_blank'
                            sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-clr)', fontSize: '15px', fontWeight: '500', width: '100%', '&:hover': { bgcolor: 'transparent' } }}>
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
                        </Button>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '100% !important', width: '100%', bgcolor: 'white', textAlign: 'start', '& a': { width: '100%', justifyContent: 'center', p: '8px 16px', '&:hover': { bgcolor: 'var(--secondary-clr-light)' } }, transition: 'all .2s ', mt: { md: 1, lg: 2 }, borderTop: '1px solid rgba(0,0,0,.2)' }}
                        >
                            {subCats}
                        </Box>
                    </ListItem>
                )
            }
        })
  return (
    <Box
    display={{ xs: 'none', md: 'inline-block' }}
    className={`${isOpenCat ? 'isCatOpen' : ''}`}
    sx={{
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.2)", position: 'absolute',
        top:!isOpenCat ?'130% !important':'101% !important',
        width: {md:'90%',lg:'85%'},left:'50%',transform:'translateX(-50%)', bgcolor: 'white', textAlign: 'start', '& button': { width: '100%', justifyContent: 'start', '&:hover': { bgcolor: 'var(--text-clr)' } }, opacity: 0, visibility: 'hidden', transition: 'all .2s ease-out', padding: '8px', overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            height: '8px !important', 
        }
    }}
    height={{ md: '250px', lg: '280px' }}
    zIndex={20}

>
    <List sx={{
        '& li': { padding: '0' }, '& li a': { lineHeight: '2em' }, '& li:hover button': { bgcolor: 'var(--secondary-clr-light)' }, paddingInlineStart: '0 !important', display: 'flex', justifyContent: 'space-between', gap: 1.5, width: '100%'
    }}>
        {catItemsInAllcats}
    </List>
</Box>
  )
}
