import React, { useContext, useEffect, useState } from 'react'
import "./../style.scss"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, createTheme, FormControlLabel, Switch, ThemeProvider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function NewProduct() {
    const [files, setFiles] = useState();
    const { token } = useContext(AuthContext)

    // start toggle is active
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(prev => !prev);
    };

    // start select category
    const [selectedCat, setSelectedCat] = useState('');
    const [categories, setCategories] = useState();

    const handleChangeSelectCat = (event) => {
        setSelectedCat(event.target.value);
    };


    useEffect(() => {
        (async () => {
            try {
                // category
                const res = await fetch(import.meta.env.VITE_BASE_API + 'category', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                if (data?.success) {
                    setCategories(data?.data?.categories)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    

    // start add product http request
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData=new FormData()
        if(files){
            files?.map(file=>{
                formData.append('files',file)
            })
        }
        try {
            // category
            const res = await fetch(import.meta.env.VITE_BASE_API + 'category', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            if (data?.success) {
                setCategories(data?.data?.categories)
            }

           

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="top box-shadow">
                <h1>افزودن محصول</h1>
            </div>
            <div className="bottom box-shadow">
                <div className="right">
                    <div className="uploadFile">
                        <label htmlFor="file">
                            <img src={files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
                            <div className="fileIcon">
                                <AddOutlinedIcon />
                            </div>
                        </label>
                        <input multiple onChange={e => setFiles(Array.from(e.target.files))} type="file" id='file' style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="left">
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`formInput`}>
                            <label>نام محصول</label>
                            <input type='text' placeholder='گردنبند' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>توضيحات</label>
                            <input type='text' placeholder='اين محصول ضد آب مي باشد.' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>مشخصات فني</label>
                            <input type='text' placeholder='جنس:استيل، رنگ:طلايي-مسي' />
                        </div>

                        <Box width={'48%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-around'}
                        gap={'5%'}
                        >
                            {/* start set isActive */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isActive}
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
                                label={isActive ? "فعال" : "غیرفعال"}
                            />
                            {/* end set isActive */}

                            {/* start select category */}
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
                                    <InputLabel id="demo-simple-select-label">دسته بندي</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedCat}
                                        label="دسته بندي"
                                        onChange={handleChangeSelectCat}
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
                                        {categories?.map(e => (
                                            <MenuItem key={e?._id} value={e?._id}>{e?.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        {/* end select category */}

                        {/* start select brand */}
                        {/* <Box sx={{
                            minWidth: 120,
                            ' .MuiInputLabel-root.Mui-focused': {
                                color: 'red'
                            },
                            ' .MuiOutlinedInput-root.Mui-focused': {
                                outlineColor: 'red'
                            },
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">برند</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedBrand}
                                    label="برند"
                                    onChange={handleChangeSelectBrand}
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
                                    {brands?.map(e => (
                                        <MenuItem key={e?._id} value={e?._id}>{e?.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box> */}
                        {/* end select brand */}

                        {/* start select product variant */}
                        {/* <Box sx={{
                            minWidth: 120,
                            ' .MuiInputLabel-root.Mui-focused': {
                                color: 'red'
                            },
                            ' .MuiOutlinedInput-root.Mui-focused': {
                                outlineColor: 'red'
                            },
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">زيرشاخه</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedBrand}
                                    label="زيرشاخه"
                                    onChange={handleChangeSelectBrand}
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
                                    {brands?.map(e => (
                                        <MenuItem key={e?._id} value={e?._id}>{e?.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box> */}
                        {/* end select product variant */}

                        <br />
                        <button type='submit'>افزودن</button>
                    </form>
                </div>
            </div>
        </>
    )
}