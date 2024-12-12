import React from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'

export default function Home() {
    return (
       <div className="home">
        <Sidebar/>
        <div className="homeContainer">
            <Navbar/>
            home container
        </div>
       </div>
    )
}
