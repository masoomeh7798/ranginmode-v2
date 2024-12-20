import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import EditIcon from '@mui/icons-material/Edit';
import {  useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Single({ rowType }) {
    const params = useParams()
    const id = rowType == 'users' ? params.userId : params.productId
    const { token } = useContext(AuthContext)
    const [item, setItem] = useState();


    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BASE_API}${rowType == 'users' ? `user/${id}` : `product/${id}`}`, {
                        'method': 'GET',
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    const data = await res.json()
                    if (data?.success) {
                        setItem(rowType == 'users' ? data?.data?.user : data?.data?.product)
                    }
                    console.log(data);

                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [token]);


 
    return (

        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="content box-shadow">
                    <div className="editButton">
                        <EditIcon />
                    </div>
                    <h1 className='title'>مشخصات</h1>
                    <div className="item">
                        <img src={import.meta.env.VITE_BASE_URL + (rowType == 'users' ? item?.img : item?.images[0])} alt="img" className='itemImg' />
                        <div className="details">
                            <h2 className="itemTitle">{rowType == 'users' ? item?.fullName : item?.name}</h2>
                            {token && item && Object?.entries(item)?.map(([key, value], index) => (
                                <div key={index} className="itemInfo">
                                    <span className="itemKey">{key}</span>
                                    <span className="itemValue">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
