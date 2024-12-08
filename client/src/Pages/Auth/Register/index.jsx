import { Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import notify from "../../../Utils/notify"
import useFormFields from '../../../Utils/useFormFields';


export default function Register({ handlePageType }) {
  const [showPass, setShowPass] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, handleChange] = useFormFields()

  const handleUploadImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await fetch(import.meta.env.VITE_BASE_API + "upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data?.success) {
        setSelectedFile(data.data.name.filename);
        notify("success", "عكس با موفقيت بارگذاري شد.");
      } else {
        notify("error", "مشكلي پيش اومد :(");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + "auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...fields, img: selectedFile }),
      });
      const data = await res.json();
      if (data?.success) {
        notify("success", "ثبت نام با موفقيت انجام شد.")
        handlePageType()
      } else {
        notify("error", "مشكلي پيش اومد :(")
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      width={{ xs: '95%', xxs: "90%", sm: '70%', md: '45%', lg: '30%' }}
      maxHeight={'98vh'}
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
            gap={{ xs: 1, sm: 1.5 }}
          >
            <Typography component={'h2'}
              fontSize={{ xs: '24px', sm: '30px' }}
              fontWeight={500}

            >ثبت نام</Typography>
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
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                gap={1}
              >
                <TextField
                  onChange={handleChange}
                  name='fullName'
                  sx={{
                    p: { xs: '8px 0', sm: '12px 0px', xl: '14px 0' },
                    '& > div': {
                      mt: { xs: '0px', sm: '16px' }
                    },
                    width: '100%'
                  }}
                  slotProps={{
                    inputLabel: {
                      sx: {
                        textAlign: 'right',
                        right: 0,
                        left: 'auto',
                        fontSize: '16px',
                        top: { xs: '-16px', sm: 0 },
                        '&.MuiInputLabel-shrink': {
                          top: '-5px',
                        }
                      }
                    }
                  }}
                  label="نام" variant="standard" />
                <TextField
                  onChange={handleChange}
                  name='phone'
                  sx={{
                    p: { xs: '8px 0', sm: '12px 0px', xl: '14px 0' },
                    '& > div': {
                      mt: { xs: '0px', sm: '16px' }
                    },
                    width: '100%'
                  }}
                  slotProps={{
                    inputLabel: {
                      sx: {
                        textAlign: 'right',
                        right: 0,
                        left: 'auto',
                        fontSize: '16px',
                        top: { xs: '-16px', sm: 0 },
                        '&.MuiInputLabel-shrink': {
                          top: '-5px',
                        }
                      }
                    }
                  }}
                  label="موبايل" variant="standard" />

              </Stack>
              <TextField
                onChange={handleChange}
                name='email'
                sx={{
                  p: { xs: '8px 0', sm: '12px 0px', xl: '14px 0' },
                  '& > div': {
                    mt: { xs: '0px', sm: '16px' }
                  },
                }}
                slotProps={{
                  inputLabel: {
                    sx: {
                      textAlign: 'right',
                      right: 0,
                      left: 'auto',
                      fontSize: '16px',
                      top: { xs: '-16px', sm: 0 },
                      '&.MuiInputLabel-shrink': {
                        top: '-5px',
                      }
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
                    top: { xs: '20%', sm: '38%' },
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
                    p: { xs: '8px 0', sm: '12px 0px', xl: '14px 0' },
                    '& > div': {
                      mt: { xs: '0px', sm: '16px' }
                    },
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
                        fontSize: '16px',
                        top: { xs: '-16px', sm: 0 },
                        '&.MuiInputLabel-shrink': {
                          top: '-5px',
                        }
                      }
                    }
                  }}
                  label="پسورد" variant="standard" />
                {showPass ? <IoEyeOff onClick={() => setShowPass(false)} /> : <FaEye onClick={() => setShowPass(true)} />}

              </Box>
            </Stack>
            {/* end text field part */}
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

            {/* Photo Upload Section */}
            <Stack width={'100%'} gap={1}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                style={{ display: 'none' }}
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button variant="outlined" component="span" fullWidth>
                  {selectedFile ? selectedFile : 'انتخاب عكس'}
                </Button>
              </label>
            </Stack>

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
            >ثبت نام</Button>
            <Typography
              alignSelf={'start'}
              fontSize={'14px'}
              fontWeight={500}
            >عضو سايت هستي؟<span>
                <Button
                  onClick={handlePageType}
                  disableRipple
                  color='secondary'
                  sx={{
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'var(--third-clr)',
                    },
                    '&:active': {
                      bgcolor: 'transparent'
                    },
                    minWidth: '40px'
                  }}

                >ورود</Button></span></Typography>

            {/* start social */}
            <Typography
              fontWeight={500}
              mt={{ xs: 1, sm: 2 }}
            >ورود با روش ها ديگر</Typography>
            <Button
              sx={{
                width: '100%',
                border: '1px solid rgba(0,0,0,.2)'
              }}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                gap={2}
                sx={{
                  '& img': {
                    width: '30px',
                    height: '30px'
                  }
                }}>
                <img src="src/assets/klipartz.com.png" alt="" />
                <Typography>ورود با حساب گوگل</Typography>

              </Stack>
            </Button>

            {/* end social */}
          </Stack>
        </FormControl>
      </form>
    </Box>
  )
}
