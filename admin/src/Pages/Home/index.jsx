import React from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Widget from '../../Components/Widget'

export default function Home() {
    return (
       <div className="home">
        <Sidebar/>
        <div className="homeContainer">
            <Navbar/>
            <div className="widgets">
                <Widget type={'user'}/>
                <Widget type={'order'}/>
                <Widget type={'earning'}/>
                <Widget type={'balance'}/>
            </div>
        </div>
       </div>
    )
}