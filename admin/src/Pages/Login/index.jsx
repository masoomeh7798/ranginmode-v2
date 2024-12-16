import { Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import "./style.scss"
import notify from '../../Utils/notify';
import useFormFields from '../../Utils/useFormFields';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [fields, handleChange] = useFormFields()
    const navigate = useNavigate()
    const { dispatch,token } = useContext(AuthContext)
    console.log(token);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + "auth", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(fields),
            });
            const data = await res.json();
            if (data?.success) {
                notify("success", "خوش اومدي ^^")
                navigate('/')
                dispatch({ type: 'SET_TOKEN', payload: data?.data })
                localStorage.setItem('token',data?.data?.token)
                localStorage.setItem('user',JSON.stringify(data?.data?.user))
            } else {
                notify("error", "مشكلي پيش اومد :(")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center'
            }}

        >
            <Box
                width={{ xs: '95%', xxs: "90%", sm: '70%', md: '45%', lg: '30%', xl: '25%' }}
            >
                <form onSubmit={handleSubmit}>
                    <FormControl
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Stack
                            bgcolor={'var(--text-clr)'}
                            borderRadius={'8px'}
                            boxShadow={' 0 0 4px 2px rgba(0,0,0,.2)'}
                            p={'24px 10%'}
                            width={'100%'}
                            alignItems={'center'}
                            gap={2}
                        >
                            <Typography component={'h2'}
                                fontSize={'30px'}
                                fontWeight={500}

                            >ورود</Typography>
                            {/* start text field part */}
                            <Stack
                                sx={{
                                    '& input': {
                                        width: '100%'
                                    }
                                }}
                                width={'100%'}
                                gap={1}
                            >
                                <TextField
                                    onChange={handleChange}
                                    name='email'
                                    sx={{
                                        p: '14px 0px'
                                    }}
                                    slotProps={{
                                        inputLabel: {
                                            sx: {
                                                textAlign: 'right',
                                                right: 0,
                                                left: 'auto',
                                                fontSize: '16px'
                                            }
                                        }
                                    }}
                                    label="ايميل" variant="standard" />
                                <Box
                                    width={'100%'}
                                    position={'relative'}
                                    sx={{
                                        '& svg': {
                                            position: 'absolute',
                                            top: '44.5%',
                                            left: '2%',
                                            opacity: .6,
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    <TextField
                                        onChange={handleChange}
                                        name='password'
                                        type={showPass ? 'text' : 'password'}
                                        sx={{
                                            p: '14px 0px',
                                            pb: 0,
                                            width: '100%',
                                            verticalAlign: 'center'
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                sx: {
                                                    textAlign: 'right',
                                                    right: 0,
                                                    left: 'auto',
                                                    fontSize: '16px'
                                                }
                                            }
                                        }}
                                        label="پسورد" variant="standard" />
                                    {showPass ? <IoEyeOff onClick={() => setShowPass(false)} /> : <FaEye onClick={() => setShowPass(true)} />}

                                </Box>
                            </Stack>
                            {/* start text field part */}
                            <Typography
                                alignSelf={'start'}
                                fontSize={'13px'}
                                fontWeight={500}
                                sx={{
                                    '& a': {
                                        color: 'var(--secondary-clr)'
                                    },
                                    '& a:hover': {
                                        color: 'var(--third-clr)'
                                    }
                                }}
                            >
                                <Link to='/'>پسورد يادت رفته؟</Link></Typography>
                            <Button
                                type='submit'
                                sx={{
                                    bgcolor: 'var(--secondary-clr)',
                                    color: 'var(--text-clr)',
                                    width: '100%',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    '&:hover': {
                                        bgcolor: 'var(--third-clr)',
                                        color: 'var(--primary-clr)',
                                    }
                                }}
                            >ورود</Button>

                        </Stack>
                    </FormControl>
                </form>
            </Box>

            {/* start background */}
            <Box
                sx={{
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }
                }}
                bgcolor={'var(--text-clr)'}
                position={'absolute'}
                top={0}
                left={0}
                height={'100%'}
                width={'100%'}
                zIndex={-1}
                className="shape-bottom">
                <img src="/public/component1.png" alt="" />
            </Box>
            {/* end background */}
        </Stack>
    )
}
