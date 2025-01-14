import React from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Widget from '../../Components/Widget'
import List from '../../Components/Table'


export default function Home() {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type={'user'} />
                    <Widget type={'order'} />
                    <Widget type={'earning'} />
                </div>
                <div className="listContainer">
                    <p className="listTitle">آخرين سفارشات</p>
                    <List/>
                </div>
            </div>
        </div>
    )
}
