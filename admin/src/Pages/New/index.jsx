import React, { useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import NewUser from './NewUser';
import NewProduct from './NewProduct';
import Typography from '@mui/material/Typography'
import NewProductVariant from './NewProductVariant';
import NewBrand from './NewBrand';
import NewCategory from './NewCategory';




export default function New() {
    const [itemType, setItemType] = useState('user');

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
            case 'brand':
                return (
                    <NewBrand />
                )
            case 'category':
                return (
                    <NewCategory />
                )

            default:
                return (<></>)
        }
    }

    // create list items
    const listItems = [
        { type: 'user', label: 'كاربر' },
        { type: 'product', label: 'محصول' },
        { type: 'productVariant', label: 'زيرشاخه' },
        { type: 'brand', label: 'برند' },
        { type: 'category', label: 'دسته بندي' },
        { type: 'slider', label: 'اسلايدر' }
    ]

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
                                {listItems?.map((item, index) => (
                                    <li className={itemType==item.type ? 'activeTab':''} data-name={item.type} key={index} onClick={e=>handleChangeType( item.type )}>
                                        <button>{item.label}</button>
                                    </li>

                                ))}

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
