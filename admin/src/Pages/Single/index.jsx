import React from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import EditIcon from '@mui/icons-material/Edit';

export default function Single() {
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
                        <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" className='itemImg' />
                        <div className="details">
                            <h2 className="itemTitle">john doe</h2>
                            <div className="itemInfo">
                                <span className="itemKey">Email: </span>
                                <span className="itemValue">john_doe@gmail.com</span>
                            </div>
                            <div className="itemInfo">
                                <span className="itemKey">Phone: </span>
                                <span className="itemValue">+98 543 7675 837</span>
                            </div>
                            <div className="itemInfo">
                                <span className="itemKey">Address: </span>
                                <span className="itemValue">Bs street 6 number 7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
