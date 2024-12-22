import React, { useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import NewUser from './NewUser';
import NewProduct from './NewProduct';

export default function New({title }) {
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
           {title == 'كاربر' ? <NewUser/> : <NewProduct/>}
            </div>
        </div>
    )
}
