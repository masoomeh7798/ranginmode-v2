import { Box, IconButton, List, ListItem, ListItemIcon, Stack, Typography } from '@mui/material'
import React from 'react'
import { CiGift } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';






export default function Footer() {
    return (
        <footer>
            {/* start top footer */}
            <Box width={{ lg: '85%', sm: '90%', xs: "95%" }} mx={'auto'} >
                <Stack flexWrap={'wrap'} width={'100%'} direction={'row'} padding={'20px 0'} sx={{ '& svg': { fontSize: '28px' }, '& p': { fontWeight: 500 } }} borderBottom={'1px solid rgba(0,0,0,.2)'} borderTop={'1px solid rgba(0,0,0,.2)'}>
                    <Stack borderBottom={{ xs: '1px solid rgba(0,0,0,.2)', lg: 0 }} width={{ xs: '100%', sm: '50%', lg: '25%' }} direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} padding={'8px 16px'}>
                        <CiGift /><Typography>هر روز با محصولات جدید</Typography>
                    </Stack>
                    <Stack borderBottom={{ xs: '1px solid rgba(0,0,0,.2)', lg: 0 }} width={{ xs: '100%', sm: '50%', lg: '25%' }} direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} padding={'8px 16px'} borderRight={{ xs: 0, sm: '1px solid rgba(0,0,0,.2)' }}>
                        <CiDiscount1 /><Typography>تخفیفات شگفت انگیز روزانه</Typography>
                    </Stack>
                    <Stack borderBottom={{ xs: '1px solid rgba(0,0,0,.2)', sm: 0 }} width={{ xs: '100%', sm: '50%', lg: '25%' }} direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} padding={'8px 16px'} borderRight={{ xs: 0, lg: '1px solid rgba(0,0,0,.2)' }}>
                        <MdOutlineLocalShipping /><Typography>ارسال رایگان برای اولین خرید</Typography>
                    </Stack>
                    <Stack width={{ xs: '100%', sm: '50%', lg: '25%' }} direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'} padding={'8px 16px'} borderRight={{ xs: 0, sm: '1px solid rgba(0,0,0,.2)' }}>
                        <CiBadgeDollar /><Typography>قیمت های مناسب و منصفانه</Typography>
                    </Stack>
                </Stack>
                {/* end top footer */}

                {/* start middle footer */}
                {/* start flex part */}
                <Stack display={{ xs: 'none', md: 'flex' }} direction={'row'} sx={{ '& > div': { width: '25%', padding: '24px 32px' } }} height={'300px'}>
                    {/* start about us */}
                    <Stack>
                        <Stack>
                            <Typography color='secondary' variant='h3' fontSize={'1.2em'} fontWeight={500} mb={1} >درباره ما</Typography>
                            <Typography fontSize={{ md: '14px', lg: '16px' }} textAlign={'justify '}>فروشگاه بدلیجات رنگین مد با بیش از 4 سال سابقه فعالیت در عرصه فروش بدلیجات و اکسسوری زنانه مردانه ساعت اکسسوری مو عرضه کننده با کیفیت ترین و جدیدترین بدلیجات و اکسسوری روز بازار در خدمت شماست.</Typography>
                        </Stack>
                    </Stack>
                    {/* end about us */}
                    {/* start address */}
                    <Stack>
                        <Stack mb={2}>
                            <Typography color='secondary' variant='h3' fontSize={'1.2em'} fontWeight={500} mb={1} >آدرس</Typography>
                            <Typography>مشهد</Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{ textWrap: 'nowrap' }} color='secondary' variant='h3' fontSize={'1.2em'} fontWeight={500} mb={1} >تلفن تماس</Typography>
                            <Typography>+989360433860</Typography>
                        </Stack>
                    </Stack>
                    {/* end address */}
                    {/* start questions list */}
                    <Stack>
                        <Typography color='secondary' variant='h3' fontSize={'1.2em'} fontWeight={500} mb={1} >سوالات پر تکرار</Typography>
                        <List sx={{ '& a': { color: 'var(--primary-clr)', opacity: .6, transition: 'all .3s', textAlign: 'start', textWrap: 'nowrap' }, '& li:hover a': { opacity: 1 }, '& li': { paddingRight: '0' } }}>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>راهنمای نگهداری بدلیجات</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>آشنایی با برند ها</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>همکاری</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>راهنمای خرید</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>رهگیری مرسولات پستی</Link></ListItem>

                        </List>
                    </Stack>
                    {/* end questions list */}
                    {/* start namade etemad */}
                    <Stack>
                        <Typography sx={{ textWrap: 'nowrap' }} color='secondary' variant='h3' fontSize={'1.2em'} fontWeight={500} mb={1} >نماد اعتماد الکترونیک</Typography>
                        <Box width='100%'>
                            <img style={{ width: '100%' }} src="/nemad-300x163.png" alt="" />
                        </Box>
                    </Stack>
                    {/* end namade etemad */}
                </Stack>
                {/* end flex part */}
                {/* start accordion part */}
                <Stack display={{xs:'flex',md:'none'}}>
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            درباره ما
                        </AccordionSummary>
                        <AccordionDetails sx={{textAlign:'justify'}}>
                        فروشگاه بدلیجات رنگین مد با بیش از 4 سال سابقه فعالیت در عرصه فروش بدلیجات و اکسسوری زنانه مردانه ساعت اکسسوری مو عرضه کننده با کیفیت ترین و جدیدترین بدلیجات و اکسسوری روز بازار در خدمت شماست.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            تماس با ما
                        </AccordionSummary>
                        <AccordionDetails>
                        <Stack mb={3}>
                            <Typography color='secondary' variant='h3' fontSize={{xs:'1em',md:'1.2em'}} fontWeight={500} mb={1} >آدرس</Typography>
                            <Typography>مشهد</Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{ textWrap: 'nowrap' }} color='secondary' variant='h3' fontSize={{xs:'1em',md:'1.2em'}} fontWeight={500} mb={1} >تلفن تماس</Typography>
                            <Typography>+989360433860</Typography>
                        </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            سوالات پر تکرار
                        </AccordionSummary>
                        <AccordionDetails>
                        <List sx={{ '& a': { color: 'var(--primary-clr)', opacity: .6, transition: 'all .3s', textAlign: 'start', textWrap: 'nowrap' }, '& li:hover a': { opacity: 1 }, '& li': { paddingRight: '0' } }}>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>راهنمای نگهداری بدلیجات</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>آشنایی با برند ها</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>همکاری</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>راهنمای خرید</Link></ListItem>
                            <ListItem><ListItemIcon><BsFillPatchQuestionFill /></ListItemIcon><Link to='/'>رهگیری مرسولات پستی</Link></ListItem>

                        </List>
                        </AccordionDetails>
                        
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            نماد اعتماد الکترونیک
                        </AccordionSummary>
                        <AccordionDetails>
                        <Stack sx={{'& img':{width:{xs:'100% !important',xxs:'70% !important'}}}} direction={'row'} mx={'auto'} width={{xs:'90% ',sm:'70%'}} justifyContent={'center'}>
                            <img src="/nemad-300x163.png" alt="" />
                        </Stack>
                        </AccordionDetails>
                     
                    </Accordion>
                </Stack>
                {/* end accordion part */}

                {/* end middle footer */}
                {/* start bottom footer */}
                <Stack my={'16px'} direction={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'} padding={'0 32px'} gap={1}>
                    <Typography sx={{ textAlign: { xs: 'center', md: 'start' } }} display={'inline-block'}>تمامی حقوق برای سایت "رنگین مد" محفوظ است.</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ '& svg': { fontSize: { xs: '24px', md: '28px' } } }}>
                        <Link to='/'><IconButton sx={{ bgcolor: '#e1306c', '&:hover svg': { color: '#e1306c !important' } }}><FaInstagram color={'var(--text-clr)'} /></IconButton></Link>
                        <Link to='/'><IconButton sx={{ bgcolor: '#24A1DE', '&:hover svg': { color: '#24A1DE !important' } }}><FaTelegramPlane color={'var(--text-clr)'} /></IconButton></Link>
                        <Link to='/'><IconButton sx={{ bgcolor: '#25d366', '&:hover svg': { color: '#25d366 !important' } }}><FaWhatsapp color={'	var(--text-clr)'} /></IconButton></Link>
                    </Stack>
                </Stack>
                {/* end bottom footer */}
            </Box>
        </footer>
    )
}
