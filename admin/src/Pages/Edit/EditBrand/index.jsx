import React, { useContext, useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, FormControlLabel, Switch } from '@mui/material';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';
import { useNavigate } from 'react-router-dom';



export default function EditBrand({ item, id }) {
    const [title, setTitle] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const { token } = useContext(AuthContext)


    // start toggle role
    const [isActive, setIsActive] = useState(true);

    const handleToggle = () => {
        setIsActive(prev => !prev);
    };

    useEffect(() => {
        if (item) {
            setTitle(item?.title);
            setIsActive(item?.isActive)
        }
    }, [item]);

    // start update brand
    const handleReset = () => {
        setTitle('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + `brand/${id}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title, isActive })
            })
            const data = await res.json()
            if (data?.success) {
                notify("success", data?.message)
                navigate('/brands')
            } else {
                notify("error", 'نام برند الزامي است.')
            }
            handleReset()
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>

            <div className="bottom">
                <div className="left">
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`formInput`}>
                            <label>نام برند</label>
                            <input value={title} onChange={handleChange} name='brand' type='text' placeholder='ژوپينگ' />
                        </div>

                        <Box
                            width={'100%'}
                            sx={{
                                '& label': {
                                    marginRight: '0px'
                                },

                            }}
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
                                            }
                                        }}
                                    />
                                }
                                label={isActive ? "فعال" : "غير فعال"}
                            />
                            {/* end set isActive */}
                        </Box>

                        <button type='submit' style={{ marginTop: 'auto' }}>افزودن</button>
                    </form>
                </div>
            </div>
        </>
    )
}
