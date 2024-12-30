import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import EditUser from './EditUser';
import EditProduct from './EditProduct';
import EditProductVariant from './EditProductVariant';
import EditSlider from './EditSlider';
import EditCategory from './EditCategory';
import EditBrand from './EditBrand';
import { Typography } from '@mui/material';
import EditComment from './EditComment';

export default function Edit({ rowType }) {
    const { id } = useParams()
    const { token } = useContext(AuthContext)
    const [item, setItem] = useState();


    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const res = await fetch(import.meta.env.VITE_BASE_API + `${rowType}/${id}`, {
                        'method': 'GET',
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    const data = await res.json()
                    if (data?.success) {
                        setItem(data?.data)
                    }
                    //    console.log(data.data);

                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [token]);


    const selectDetailItemComponent = (rowType) => {
        switch (rowType) {

            case 'user':
                return (
                    <EditUser item={item} id={id} />
                )
            case 'product':
                return (
                    <EditProduct item={item} id={id} />
                )

            case 'product-variant':
                return (
                    <EditProductVariant item={item} id={id} />
                )
            case 'brand':
                return (
                    <EditBrand item={item} id={id} />
                )
            case 'category':
                return (
                    <EditCategory item={item} id={id} />
                )
            case 'slider':
                return (
                    <EditSlider item={item} id={id} />
                )
            case 'comment':
                return (
                    <EditComment item={item} id={id} />
                )

            default:
                return (<></>)
        }
    }



    return (

        <div className="edit">
            <Sidebar />
            <div className="editContainer">
                <Navbar />
                <div className="top box-shadow">
                    <Typography
                        component={'h1'}
                        fontSize={24}
                    >ويرايش</Typography>
                </div>
                <div className="bottom box-shadow">
                    <div className="addItemsParts">

                        <div className="displayComponent">
                            {selectDetailItemComponent(rowType)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
