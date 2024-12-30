import React, { useContext, useEffect, useState } from 'react'
import "./../style.scss"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, FormControlLabel, Switch } from '@mui/material';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';
import { useNavigate } from 'react-router-dom';



export default function EditUser({ item ,id}) {
  const [files, setFiles] = useState([]);
  const { token } = useContext(AuthContext)
  // start toggle role
  const [isActive, setIsActive] = useState('user');
  const navigate=useNavigate()

  const handleToggle = () => {
    setIsActive(prev => prev == 'user' ? 'admin' : 'user');
  };


  const [fields, handleChange, setFields] = useFormFields({
    fullName: '',
    phone: '',
    email: '',
    password: '*****',
  })
  useEffect(() => {
    if (item) {
      setFields({
        fullName: item.fullName,
        phone: item.phone,
        email: item.email,
        password: '*****',
      });
      setIsActive(item?.role)
      setFiles(item.img && [ {name:item.img}])

    }
  }, [item]);

console.log(files);

  // start upload images
  const handleChangeImages = async (e) => {
    const formData = new FormData()
    if (e.target.files) {
      Array.from(e.target.files)?.map(file => {
        formData.append('files', file)
      })
    }
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + 'upload', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData
      })
      const data = await res.json()
      if (data?.success) {
        setFiles(data?.data)
      }


    } catch (error) {
      console.log(error);
    }
  }

  // start add product
  const handleReset = () => {
    setFields({
      fullName: '',
      phone: '',
      email: '',
      password: '',
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fieldsNames = Object.keys(fields)
    let empty = false
    fieldsNames?.map(e => {
      if (fields[e] === '') {
        empty = true
      }
    })
    if (empty) {
      notify('error', 'همه فيلد ها را پر كنيد.')
    } else {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `user/${id}`, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...fields, role: isActive, img: files[0]?.name })
        })
        const data = await res.json()
        if (data?.success) {
          notify("success", data?.message)
          navigate('/users')

        } else {
          notify("error", data?.message)
        }
        handleReset()
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      <div className="bottom">
        <div className="right">
          <div className="uploadFile">
            <label htmlFor="file">
              <img src={(files && files.length != 0) ? import.meta.env.VITE_BASE_URL + files[0]?.name : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
              <div className="fileIcon">
                <AddOutlinedIcon />
              </div>
            </label>
            <input multiple onChange={handleChangeImages} type="file" id='file' style={{ display: 'none' }} />
          </div>
        </div>
        <div className="left">
          <form onSubmit={handleSubmit}>
            <div
              className={`formInput`}>
              <label>نام كامل</label>
              <input value={fields?.fullName} onChange={handleChange} name='fullName' type='text' placeholder='ويدا نورزاد' />
            </div>
            <div
              className={`formInput`}>
              <label>موبايل</label>
              <input value={fields?.phone} onChange={handleChange} name='phone' type='text' placeholder='09025251542' />
            </div>
            <div
              className={`formInput`}>
              <label>ايميل</label>
              <input value={fields?.email} onChange={handleChange} name='email' type='text'
                placeholder='vida@gmail.com' />
            </div>
            <div
              className={`formInput`}>
              <label>رمز عبور</label>
              <input value={fields?.password} onChange={handleChange} name='password' type='text'
                placeholder='*********' />
            </div>

            <Box width={'100%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              gap={'5%'}
            >
              {/* start set isActive */}
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive == 'user'}
                    onChange={handleToggle}
                    sx={{
                      '& .Mui-checked': {
                        color: 'red !important',
                      },
                      '& .Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'red !important',
                      },
                      '& + .MuiSwitch-track': {
                        backgroundColor: 'red',
                      },
                    }}
                  />
                }
                label={isActive == 'admin' ? "ادمين" : "كاربر"}
              />
              {/* end set isActive */}
            </Box>
            <br />
            <button type='submit'>افزودن</button>
          </form>
        </div>
      </div>
    </>
  )
}
