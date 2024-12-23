import React, { useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import NewUser from './NewUser';
import NewProduct from './NewProduct';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NewProductVariant from './NewProductVariant';




export default function New() {
    const [itemType, setItemType] = useState('product');
    const handleChangeType = (item) => {
        setItemType(item)
    }
    const selectAddItemComponent = (itemType) => {
        switch (itemType) {

            case 'user':
                return (
                    <NewUser />
                )
            case 'product':
                return (
                    <NewProduct />
                )

            case 'productVariant':
                return (
                    <NewProductVariant />
                )

            default:
                break;
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top box-shadow">
                    <Typography
                        component={'h1'}
                        fontSize={24}
                    >افزودن:</Typography>
                </div>
                <div className="bottom box-shadow">
                    <div className="addItemsParts">
                        <div className="selectBar">
                            <ul>
                                <li><button onClick={() => handleChangeType('user')}>كاربر</button></li>
                                <li><button onClick={() => handleChangeType('product')}>محصول</button></li>
                                <li><button onClick={() => handleChangeType('productVariant')}>زيرشاخه ي محصول</button></li>
                                <li><button onClick={() => handleChangeType('brand')}>برند</button></li>
                                <li><button onClick={() => handleChangeType('category')}>دسته بندي</button></li>
                                <li><button onClick={() => handleChangeType('slider')}>اسلايدر</button></li>
                            </ul>
                        </div>
                        <div className="displayComponent">
                            {selectAddItemComponent(itemType)}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
