import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Comments from './Comments';



export default function ProductDeatilsBottom({ productId }) {
    const [activeTab, setactiveTab] = useState(1);
    const [product, setProduct] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + `product/${productId}`)
                const data = await res.json()
                setProduct(data?.data?.product)
            } catch (error) {
                console.log(error);
            }
        })()

    }, []);
    return (
        <Box
            boxShadow={'0 0 10px 2px rgba(0,0,0,.2)'}
            my={'10px'}
            borderRadius={2}
        >
            <Stack>
                {/* start tab part */}
                <Stack
                    sx={{
                        '& button': {
                            borderRadius: '24px',
                            fontWeight: 500,
                            fontSize:{xs:'12px',xxs:'16px'}
                        }
                    }}
                    direction={'row'}
                    justifyContent={'start'}
                    p={'20px 0'}
                    mx={'24px'}
                    gap={{xs:1,xxs:2}}
                    borderBottom={'1px solid rgba(0,0,0,.2)'}
                >
                    <Button
                        sx={{
                            color: activeTab == 1 ? 'var(--text-clr) !important' : 'black',
                            bgcolor: activeTab == 1 ? 'var(--secondary-clr) !important' : '#F1F1F1'
                        }}
                        onClick={() => setactiveTab(1)} variant='outlined'>توضيحات</Button>
                    <Button
                        sx={{
                            color: activeTab == 2 ? 'var(--text-clr) !important' : 'black',
                            bgcolor: activeTab == 2 ? 'var(--secondary-clr) !important' : '#F1F1F1'
                        }}
                        onClick={() => setactiveTab(2)} variant='outlined'>مشخصات فني</Button>
                    <Button
                        sx={{
                            color: activeTab == 3 ? 'var(--text-clr) !important' : 'black',
                            bgcolor: activeTab == 3 ? 'var(--secondary-clr) !important' : '#F1F1F1'
                        }}
                        onClick={() => setactiveTab(3)} variant='outlined'>نظرات</Button>
                </Stack>
                {/* end tab part */}

                {/* start details part */}
                <Stack
                    p={'20px 24px'}
                >
                    {activeTab == 1 &&
                        <Typography
                            textAlign={'justify'}
                        >{product?.description}</Typography>
                    }

                    {activeTab == 2 &&
                        <TableContainer component={Paper}
                            sx={{
                                width: { xs: '100%', sm: '60%', lg: '40%' },
                                alignSelf: 'center'
                            }}
                        >
                            <Table aria-label="simple table">
                                <TableBody>
                                    {product?.information?.map((e) => (
                                        <TableRow
                                            key={e?._id}
                                            sx={{ '&:last-child td': { border: 0 },
                                            '& td':{
                                                textAlign:'right'
                                            }}}
                                        >
                                            <TableCell align="right">{e?.name}</TableCell>
                                            <TableCell key={e?._id} align="right">{e?.value}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    {activeTab == 3 && <Comments productId={productId} />}

                </Stack>
                {/* end details part */}
            </Stack>


        </Box>
    )
}
