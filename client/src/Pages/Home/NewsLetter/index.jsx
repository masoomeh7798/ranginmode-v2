import { Box, Button, FormControl, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import notify from '../../../Utils/notify';


export default function NewsLetter() {
    const [email, setEmail] = useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'newsLetter', {
              "method": "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({ email })
            })
            const data = await res.json()
            if(data?.success){
                notify('success',data?.message)
            }else{
                notify('error',data?.message?.split(':').at(-1))
            }
            setEmail('')
          } catch (error) {
            console.log(error);
          }
    }
    return (
        <Stack sx={{
            backgroundImage: 'linear-gradient(147deg, rgba(208,115,116,1) 18%, rgba(199,73,74,1) 33%, rgba(207,70,71,1) 49%, rgba(199,0,1,1) 66%, rgba(129,0,1,1) 84%)'
        }}
         height={{ xs: '45vh', md: '50vh', }} alignItems={{ xs: 'center', md: 'start' }} position={'relative'} justifyContent={'center'} px={{ xs: 0, sm: '5%', lg: '9%' }}>
            <Stack color={'var(--text-clr)'} width={{ xs: '90%', md: '50%' }}>
            <form onSubmit={handleSubmit}>
                <Typography sx={{ opacity: '.85' }} fontSize={{ xs: '1em', sm: '1.2em' }} mb={{xs:1,sm:2}}>ارسال رایگان برا ی اولین خرید</Typography>
                <Typography sx={{ opacity: '.95' }} fontSize={{ xs: '1.3em', sm: '2em' }} mb={{xs:2,sm:1}}>عضویت در خبرنامه رنگین مد</Typography>
                <Typography sx={{ opacity: '.5' }} fontSize={{ xs: '.8em', sm: '1em' }} mb={1}>برای دریافت جدیدترین اخبار رنگین مد <br />عضو خبرنامه شوید...</Typography>
                <Box position={'relative'} bgcolor={'var(--text-clr)'} padding={{ xs: '4px', sm: '10px' }} borderRadius={'8px'} paddingRight={{ xs: '8% !important', sm: '5% !important' }} sx={{ '& input': { fontSize: { xs: '16px', sm: '24px' } }, '& svg': { fontSize: { xs: "20px", sm: '28px' } } }}>
                    <MdEmail style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', opacity: .5 }} color='var(--secondary-clr)' />
                    <input value={email} onChange={(e)=>setEmail(e?.target.value)} placeholder='آدرس ایمیل...' type="text" style={{ width: '80%', padding: '8px', outline: 'none', border: '0', backgroundColor: 'transparent', marginRight: '8px' }} />
                    <Button type='submit' sx={{ position: 'absolute', bgcolor: 'var(--secondary-clr)', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: { xs: '12px', sm: '16px' }, padding: { xs: '8px 8px', sm: '14px 20px' } }} color='var(--primary-clr)'>عضویت</Button>
                </Box>
            </form>
            </Stack>
            <Box display={{ xs: 'none', md: 'inline-block' }} sx={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)' }}  height={{ md: '90%', lg: '100%' }}>
                <img className='news-letter-img' style={{ width: '100%', height: '100%' }} src="pngimg.com - jewelry_PNG6796.png" alt="" />
            </Box>


        </Stack>
    )
}
