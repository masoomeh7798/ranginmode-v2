import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import SingleUser from './SingleUser';
import SingleProduct from './SingleProduct';
import SingleProductVariant from './SingleProductVariant';
import SingleSlider from './SingleSlider';
import SingleCategory from './SingleCategory';
import SingleBrand from './SingleBrand';
import SingleComment from './SingleComment';

export default function Single({ rowType }) {
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
                    <SingleUser item={item} />
                )
            case 'product':
                return (
                    <SingleProduct item={item} />
                )

            case 'product-variant':
                return (
                    <SingleProductVariant item={item} />
                )
            case 'brand':
                return (
                    <SingleBrand item={item} />
                )
            case 'category':
                return (
                    <SingleCategory item={item} />
                )
            case 'slider':
                return (
                    <SingleSlider item={item} />
                )
            case 'comment':
                return (
                    <SingleComment item={item} />
                )

            default:
                return (<></>)
        }
    }



    return (

        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="content box-shadow">
                    <h1 className='title'>مشخصات</h1>
                  {selectDetailItemComponent(rowType)}
                </div>
            </div>
        </div>
    )
}
