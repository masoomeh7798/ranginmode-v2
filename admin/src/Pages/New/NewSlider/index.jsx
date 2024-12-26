import React, { useContext, useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';



export default function NewSlider() {
    const [files, setFiles] = useState([]);
    const [fields, handleChange,setFields] =useFormFields({title:'',href:''});
    const { token } = useContext(AuthContext)


  

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


    // start select category
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleSelectPosition = (event) => {
        setSelectedPosition(event.target.value);
    };


    // start create category
    const handleReset = () => {
        setFields({
            title:'',
            href:''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'slider', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...fields, image: files[0].name, position: selectedPosition })
            })
            const data = await res.json()
            if (data?.success) {
                notify("success", data?.message)

            } else {
                notify("error", data?.message)
            }
            handleReset()
        } catch (error) {
            console.log(error);
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
                            <label>نام اسلايد</label>
                            <input value={fields.title} onChange={handleChange} name='title' type='text' placeholder='تخفيف يلدا' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>لينك بشه به:</label>
                            <input value={fields.href} onChange={handleChange} name='href' type='text'
                                placeholder='/products/67323bcf45bc3dab3fb89629/دستبند' />
                        </div>

                        <Box
                            width={'100%'}
                            display={'flex'}
                            gap={'5%'}
                            sx={{
                                '& label': {
                                    marginRight: '0px'
                                },

                            }}
                        >
                            {/* start select position */}
                            <Box sx={{
                                minWidth: 120,
                                ' .MuiInputLabel-root.Mui-focused': {
                                    color: 'red'
                                },
                                ' .MuiOutlinedInput-root.Mui-focused': {
                                    outlineColor: 'red'
                                },
                            }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">موقعيت</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedPosition}
                                        label="موقعيت"
                                        onChange={handleSelectPosition}
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                },
                                            },
                                        }}
                                        sx={{
                                            '&.MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'red',  // Change the border color when focused
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value={'home'}>صفحه اصلي</MenuItem>
                                        <MenuItem value={'discount'}>تخفيفات</MenuItem>
                                        <MenuItem value={'products'}>محصولات</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                            {/* end select position */}
                        </Box>



                        <button type='submit' style={{ marginTop: 'auto' }}>افزودن</button>
                    </form>
                </div>
            </div>
        </>
    )
}
