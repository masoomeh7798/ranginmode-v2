import React from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from "../../Components/Navbar"
import Datatable from '../../Components/Datatable'

export default function List() {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <Datatable/>
            </div>
        </div>
    )
}
