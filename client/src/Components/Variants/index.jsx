import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'

export default function Variants({ variants }) {
    const [activeVariant, setActiveVariant] = useState(0);

    return (
        <Stack
            direction={'row'}
            gap={2}
            alignItems={'center'}
            mt={'auto'}
        >
            {variants?.map((e, index) => (
                <Box key={index}>

                    <Typography 
                        variant='body2'
                        fontSize={'16px'}
                        fontWeight={'500'}
                        mb={1}
                    > {e?.name}: </Typography>
                    <Stack
                        flexDirection={'row'}
                        gap={1}
                        sx={{
                            '& button': {
                                fontSize: { xs: '12px', sm: '14px' },
                                minWidth: { xs: '40px', sm: '54px' },
                                bgcolor: '#F1F1F1'
                            }
                        }}
                    >
                        {e?.value?.map((e2, index2) => (
                           
                                <Button key={index2}
                                    sx={{
                                        color: activeVariant == index2 ? 'var(--text-clr) !important' : 'black',
                                        bgcolor: activeVariant == index2 ? 'var(--secondary-clr) !important' : '#F1F1F1'
                                    }}
                                    onClick={() => setActiveVariant(index2)}>{e2}</Button>
                            
                        ))}


                    </Stack>
                </Box>))}


        </Stack>
    )
}
