import { Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import notify from "../../../Utils/notify"
import useFormFields from '../../../Utils/useFormFields';
import { useDispatch } from 'react-redux';
import { login } from "../../../Store/Slices/AuthSlice"
import Modal from '@mui/material/Modal';

// start forget pass modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function Login({ handlePageType }) {
  const [showPass, setShowPass] = useState(false);
  const [fields, handleChange] = useFormFields()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // start reset pass
  const [resetModal, setResetModal] = useState(false);
  const [newPass, setNewPass] = useState();
  const handleOpenResetModal = () => setResetModal(true);
  const handleCloseResetModal = () => setResetModal(false);

  const handleResetPass = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + "user/reset-pass", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ phone, password:newPass, code }),
      });
      const data = await res.json();
      if (data?.success) {
        notify("success", data.message)
        handleCloseResetModal()
      } else {
        notify("error", data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // start forget pass modal
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [code, setCode] = useState();
  const [phone, setPhone] = useState();

  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // end forget pass modal

  // start send code
  const handleSendCodeSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + "user/forget-pass", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data?.success) {
        notify("success", data.message)
        handleOpenChild()
      } else {
        notify("error", data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }


  // start check code
  const handleCheckCode = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + "user/check-code", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (data?.success) {
        notify("success", data.message)
        handleOpenResetModal()
        handleClose()
        handleCloseChild()
      } else {
        notify("error", data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }


  // start login to account
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
        dispatch(login({ token: data?.data?.token, user: data?.data?.user }))
      } else {
        notify("error", "مشكلي پيش اومد :(")
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
                <Button
                  sx={{
                    bgcolor: 'transparent',
                    padding: 0,
                    fontSize: 12,
                    '&:hover': {
                      color: 'var(--secondary-clr-dark)'
                    }
                  }}
                  onClick={handleOpen}>پسورد يادت رفته؟</Button></Typography>
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
              <Typography
                alignSelf={'start'}
                fontSize={'14px'}
                fontWeight={500}
              >عضو سايت نيستي؟<span>
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
                    }}

                  >ثبت نام</Button></span></Typography>
            </Stack>
          </FormControl>
        </form>
      </Box>

      {/* start forget pass modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 400,
              '& h2': {
                fontSize: 20,
                mb: 2,
              }
            }}>

            <Box
              component="form"
              onSubmit={handleSendCodeSubmit}
              sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
                '& .MuiInputBase-input': {
                  height: '3em',
                  direction: 'ltr'
                }
                , display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              noValidate
              autoComplete="off"
            >
              <h2 id="parent-modal-title" >بازيابي رمز عبور</h2>
              <p id="parent-modal-description">
                لطفا شماره موبايل خود را وارد نماييد:
              </p>
              <TextField
                required
                id="outlined-password-input"
                label="09150000000"
                type="text"
                autoComplete="current-password"
                onChange={(e) => setPhone(e?.target?.value)}
                sx={{
                  my: 2
                }}
              />
              {/* start child modal */}
              <>
                <Button
                  type='submit'
                  sx={{
                    alignSelf: 'center',
                    bgcolor: 'green',
                    color: 'var(--text-clr)'
                  }}
                >ارسال</Button>
                <Modal
                  open={openChild}
                  onClose={handleCloseChild}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{
                    ...style, width: 'fit-content',
                    '& h2': {
                      fontSize: 20,
                      mb: 1,
                      textWrap: 'nowrap'
                    }
                  }}>
                    <Box
                      onClick={handleCheckCode}
                      sx={{
                        '& .MuiTextField-root': { m: 2, width: '12ch' },
                        '& .MuiInputBase-input': {
                          height: '3em',
                          direction: 'ltr'
                        }
                        , display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <h2 id="child-modal-title">كد تاييد را وارد نماييد:</h2>
                      <TextField
                        required
                        id="outlined-password-input"
                        label="123456"
                        type="text"
                        autoComplete="current-password"
                        onChange={(e) => setCode(e?.target?.value)}

                      />
                      <Button
                        sx={{
                          alignSelf: 'center',
                          bgcolor: 'green',
                          color: 'var(--text-clr)'
                        }}
                      >تاييد</Button>
                    </Box>
                  </Box>
                </Modal>
              </>
              {/* end child modal */}
            </Box>
          </Box>
        </Modal>
      </div>
      {/* end forget pass modal */}

      {/* start reset pass modal */}
      {resetModal &&
        <div>
          <Modal
            open={resetModal}
            onClose={handleCloseResetModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '25ch' },
                  '& .MuiInputBase-input': {
                    height: '3em',
                    direction: 'ltr'
                  }
                  , display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
              >
                <h2 id="parent-modal-title" >رمز عبور جديد</h2>
                <TextField
                  required
                  id="outlined-password-input"
                  label="Aa1234"
                  type="text"
                  autoComplete="current-password"
                  onChange={(e) => setNewPass(e?.target?.value)}
                  sx={{
                    my: 2
                  }}
                />
                <Button
                  onClick={handleResetPass}
                  sx={{
                    alignSelf: 'center',
                    bgcolor: 'green',
                    color: 'var(--text-clr)'
                  }}
                >به روز رساني</Button>
              </Box>
            </Box>
          </Modal>
        </div>
      }
      {/* end reset pass modal */}
    </>
  )
}
