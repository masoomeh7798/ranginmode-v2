import React, { useContext, useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';



export default function NewCategory() {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const { token } = useContext(AuthContext)


    // start toggle active
    const [isActive, setIsActive] = useState(true);

    const handleToggleActive = () => {
        setIsActive(prev => !prev);
    };

    // start toggle main
    const [isMain, setIsMain] = useState(true);

    const handleToggleMain = () => {
        setIsMain(prev => !prev);
    };

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
    const [selectedCat, setSelectedCat] = useState('');
    const [categories, setCategories] = useState();

    const handleChangeSelectCat = (event) => {
        setSelectedCat(event.target.value);
    };
    useEffect(() => {
        (async () => {
            try {
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
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);


    // start create category
    const handleReset = () => {
        setTitle('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + 'category', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title, isActive, isMain, image: files[0].name,subCategory:selectedCat })
            })
            const data = await res.json()
            if (data?.success) {
                notify("success", data?.message)

            } else {
                notify("error", 'نام دسته بندي الزامي است.')
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
                            <label>نام دسته بندي</label>
                            <input value={title} onChange={handleChange} name='category' type='text' placeholder='گردنبند زنانه' />
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
                            {/* start set isActive */}
                            <FormControlLabel
                                sx={{
                                    width: '120px',
                                }}
                                control={
                                    <Switch
                                        checked={isActive}
                                        onChange={handleToggleActive}
                                        sx={{

                                            '& .Mui-checked': {
                                                color: 'red !important',
                                            },
                                            '& .Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: 'red !important',
                                            },
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: 'red',
                                            }
                                        }}
                                    />
                                }
                                label={isActive ? "فعال" : "غير فعال"}
                            />
                            {/* end set isActive */}

                            {/* start set isMain */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isMain}
                                        onChange={handleToggleMain}
                                        sx={{
                                            '& .Mui-checked': {
                                                color: 'red !important',
                                            },
                                            '& .Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: 'red !important',
                                            },
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: 'red',
                                            }
                                        }}
                                    />
                                }
                                label={isMain ? "اصلي" : "زيرمجموعه"}
                            />
                            {/* end set isMain */}

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
                        </Box>

                       

                        <button type='submit' style={{ marginTop: 'auto' }}>افزودن</button>
                    </form>
                </div>
            </div>
        </>
    )
}
