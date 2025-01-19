import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';


export default function Callback() {
    const url = new URL(window.location.href)
    const Authority = url.searchParams.get('Authority')
    const Status = url.searchParams.get('Status')
    const [afterPaymentData, setAfterPaymentData] = useState({});
    const [timer, setTimer] = useState(15);
    const navigate = useNavigate()

    useEffect(() => {
        let interval;
        if (timer <= 0) {
            navigate('/');
        } else {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000); // decrement every 1 second
        }
        return () => clearInterval(interval);
    }, [timer]);


    // verify
    useEffect(() => {
        (async () => {
            if (Authority && Status) {
                try {
                    const res = await fetch(import.meta.env.VITE_BASE_API + 'order/verify', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ Authority, Status })
                    })
                    const data = await res.json()
                    console.log(data);
                    setAfterPaymentData(data)


                } catch (error) {
                    console.log(error);
                }
            }
        })()
    }, [Authority, Status])
    return (
        <Box
            width={{ lg: '85%', sm: '90%', xs: "90%" }}
            mx={'auto'}
            py={{ xs: 2, md: 3 }}
            display={'flex'}
            justifyContent={'center'}
            gap={{ xs: 2, sm: 5 }}
        >
            <Stack
                width={{ xs: '100%', md: '50%' }}
                border={`2px solid ${afterPaymentData?.success ? "green" : 'red'}`}
                borderRadius={1}
                alignItems={'center'}
                py={{ xs: 2, md: 3 }}
                boxShadow={'0 0 2px 1px rgba(0,0,0,0.2)'}
            >
                <Box
                    sx={{
                        '& svg': {
                            color: afterPaymentData?.success ? 'green' : 'red',
                            fontSize: { xs: '2rem', md: '3.5rem' }
                        }
                    }}
                >
                    {afterPaymentData?.success ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
                </Box>
                <Typography component={'h1'} fontSize={{xs:20,md:24}} fontWeight={'600'}
                sx={{
                    textWrap:'wrap',
                    textAlign:'center'
                }}
                >
                    {afterPaymentData?.success ? 'پرداخت شما با موفقيت انجام شد.' : 'پرداخت شما ناموفق بود.'}
                </Typography>
                <Box
                    my={2}
                    mx={2}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    sx={{
                        '& p': {
                            fontWeight: 500,
                            fontSize:{xs:'14px',md:'16px'}
                        }
                    }}
                >
                    <Typography>مبلغ خريد شما:</Typography>
                    <Typography mb={1}>{afterPaymentData?.data?.amount?.toLocaleString()} تومان</Typography>
                    <Typography>شماره مرجع تراكنش:</Typography>
                    <Typography
                    sx={{
                        width:'100%',
                        whiteSpace:'wrap',
                        wordBreak:'break-word',
                        textAlign:'center'
                        
                    }}
                    >
                        {
                            afterPaymentData?.success ?
                                afterPaymentData?.data?.verifypay?.data?.ref_id :
                                Authority
                        }
                    </Typography>
                </Box>
                <Typography fontWeight={'500'}>
                    {timer}
                </Typography>
                <Button
                    href='/'
                    sx={{
                        bgcolor: "var(--secondary-clr)",
                        color: "whitesmoke",
                        transition: "all .5s",
                        mt: 1,
                        '&:active': {
                            bgcolor: "var(--third-clr)",
                            color: "var(--primary-clr)"
                        }
                    }}
                >بازگشت به صفحه اصلي</Button>
            </Stack>
        </Box>
    )
}
