import React, { useContext, useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AuthContext } from '../../../Context/AuthContext';
import { Box, FormControlLabel, Switch } from '@mui/material';
import useFormFields from '../../../Utils/useFormFields';
import notify from '../../../Utils/notify.js';
import { useNavigate } from 'react-router-dom';



export default function EditComment({ item, id }) {
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const { token } = useContext(AuthContext)


    // start toggle publish
    const [isPublish, setIsPublish] = useState(true);

    const handleToggle = () => {
        setIsPublish(prev => !prev);
    };

    useEffect(() => {
        if (item) {
            setContent(item?.content);
            setIsPublish(item?.isPublish)
        }
    }, [item]);

    // start update brand
    const handleReset = () => {
        setContent('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + `comment/${id}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ content, isPublish })
            })
            const data = await res.json()
            if (data?.success) {
                notify("success", data?.message)
                navigate('/comments')
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
                            <label>متن</label>
                            <input value={content} onChange={handleChange} name='content' type='text' />
                        </div>

                        <Box
                            width={'100%'}
                            className={'switch'}
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
                                        checked={isPublish}
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
                                label={isPublish ? "منتشر شده" : "منتشر نشده"}
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
