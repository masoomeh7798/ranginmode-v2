import React, { useContext, useEffect, useState } from 'react'
import "./../style.scss"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, createTheme, FormControlLabel, Switch, ThemeProvider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';



export default function NewProduct() {
    const [files, setFiles] = useState();
    const [fields, handleChange, setFields] = useFormFields({ name: '', description: '', information: '' })
    const { token } = useContext(AuthContext)


    // start toggle is active
    const [isActive, setIsActive] = useState(true);

    const handleToggle = () => {
        setIsActive(prev => !prev);
    };


    // start select category
    const [selectedCat, setSelectedCat] = useState('');
    const [categories, setCategories] = useState();

    const handleChangeSelectCat = (event) => {
        setSelectedCat(event.target.value);
    };

    // brand
    const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState();

    const handleChangeSelectBrand = (event) => {
        setSelectedBrand(event.target.value);
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
                    setCategories(data?.data)
                }
                // brand
                const resB = await fetch(import.meta.env.VITE_BASE_API + 'brand', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                const dataB = await resB.json()
                if (data?.success) {
                    setBrands(dataB?.data)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);


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
            name: '',
            description: '',
            information: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const information = fields?.information?.split('+').map(e => e.split(':')).map(e => ({ name: e[0], value: e[1] }))
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'product', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...fields, information, images: files?.map(e => e?.name), isActive, categoryId: selectedCat, brandId: selectedBrand })
            })
            const data = await res.json()
            if (data?.success) {
                notify("success", data?.message)

            } else {
                notify("error", "همه فيلد ها الزامي هستند.")
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
                            <label>نام محصول</label>
                            <input value={fields.name} onChange={handleChange} name='name' type='text' placeholder='گردنبند' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>توضيحات</label>
                            <input value={fields.description} onChange={handleChange} name='description' type='text' placeholder='اين محصول ضد آب مي باشد.' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>مشخصات فني</label>
                            <input value={fields.information} onChange={handleChange} name='information' type='text'
                                placeholder='جنس:استيل+ رنگ:طلايي-مسي' />
                        </div>

                        <Box width={'48%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            gap={'5%'}
                            className={'switch'}
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
                                label={isActive ? "موجود" : "ناموجود"}
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
                            {/* end select category */}

                            {/* start select brand */}
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
                            </Box>

                            {/* end select brand */}
                        </Box>


                        <br />
                        <button type='submit'>افزودن</button>
                    </form>
                </div>
            </div>
        </>
    )
}
