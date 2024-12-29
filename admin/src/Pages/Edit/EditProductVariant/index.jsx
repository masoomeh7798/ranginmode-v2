import React, { useContext, useEffect, useState } from 'react'
import "./../style.scss"
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormFields from '../../../Utils/useFormFields.js';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import notify from '../../../Utils/notify.js';

export default function EditProductVariant() {
    const { token } = useContext(AuthContext)
    const [fields, handleChange, setFields] = useFormFields({
        name: '',
        quantity: '',
        price: '',
        finalPrice: '',
        discount: '',
    })


    // start select product
    const [selectedProduct, setSelectedProduct] = useState('');
    const [products, setProducts] = useState();

    const handleSelectProduct = (event) => {
        setSelectedProduct(event.target.value);
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'product')
                const data = await res.json()
                if (data?.success) {
                    setProducts(data?.data)
                }

            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    console.log(products);

    // start add product
    const handleReset = () => {
        setFields({
            name: '',
            quantity: '',
            price: '',
            finalPrice: '',
            discount: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + `product-variant/${selectedProduct}`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...fields, productId: selectedProduct })
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
                <div className="left">
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`formInput`}>
                            <label>نام زيرشاخه</label>
                            <input value={fields.name} onChange={handleChange} name='name' type='text' placeholder='طلايي' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>تعداد</label>
                            <input value={fields.quantity} onChange={handleChange} name='quantity' type='number' placeholder='10' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>قيمت</label>
                            <input value={fields.price} onChange={handleChange} name='price' type='text'
                                placeholder='65,000' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>درصد تخفيف</label>
                            <input value={fields.discount} onChange={handleChange} name='discount' type='text'
                                placeholder='5' />
                        </div>
                        <div
                            className={`formInput`}>
                            <label>قيمت بعد از تخفيف</label>
                            <input value={fields.finalPrice} onChange={handleChange} name='finalPrice' type='text'
                                placeholder='45,000' />
                        </div>

                        <Box width={'48%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'start'}
                        >

                            {/* start select brand */}
                            <Box sx={{
                                mr: '4%',
                                minWidth: 120,
                                ' .MuiInputLabel-root.Mui-focused': {
                                    color: 'red'
                                },
                                ' .MuiOutlinedInput-root.Mui-focused': {
                                    outlineColor: 'red'
                                },
                            }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">محصول</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedProduct}
                                        label="محصول"
                                        onChange={handleSelectProduct}
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
                                        {products?.map(e => (
                                            <MenuItem key={e?._id} value={e?._id}>{e?.name}</MenuItem>
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
