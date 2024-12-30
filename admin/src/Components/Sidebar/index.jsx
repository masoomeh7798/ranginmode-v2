import React, { useContext } from 'react'
import "./style.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../Context/DarkModeContext.jsx';
import { AuthContext } from '../../Context/AuthContext.jsx';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';


export default function Sidebar() {
    const { dispatch } = useContext(DarkModeContext)
    const { dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        authDispatch({ type: 'CLEAR_TOKEN' });
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/'>
                    <span className="logo">مدير سايت</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">اصلي</p>
                    <Link to='/'>
                        <li>
                            <DashboardIcon className='icon' />
                            <span>داشبورد</span>
                        </li>
                    </Link>
                    <p className="title">ليست ها</p>
                    <Link to='/new'>
                        <li>
                            <AddOutlinedIcon className='icon' />
                            <span>افزودن موارد جديد</span>
                        </li>
                    </Link>
                    <Link to='/users' >
                        <li>
                            <PersonOutlineOutlinedIcon className='icon' />
                            <span>كاربران</span>
                        </li>
                    </Link>
                    <Link to='/products'>
                        <li>
                            <StorefrontOutlinedIcon className='icon' />
                            <span>محصولات</span>
                        </li>
                    </Link>
                    <Link to='/product-variants'>
                        <li>
                            <CategoryOutlinedIcon className='icon' />
                            <span> زيرشاخه ي محصولات</span>
                        </li>
                    </Link>
                    <Link to='/brands'>
                        <li>
                            <Brightness7OutlinedIcon className='icon' />
                            <span>برند ها</span>
                        </li>
                    </Link>
                    <Link to='/categories'>
                        <li>
                            <ViewCompactOutlinedIcon className='icon' />
                            <span>دسته بندي ها</span>
                        </li>
                    </Link>
                    <Link to='/sliders'>
                        <li>
                            <ViewCarouselOutlinedIcon className='icon' />
                            <span>اسلايد ها</span>
                        </li>
                    </Link>
                    <Link to='/comments'>
                        <li>
                            <ChatOutlinedIcon className='icon' />
                            <span>نظرات</span>
                        </li>
                    </Link>

                    <li>
                        <CreditCardOutlinedIcon className='icon' />
                        <span>سفارشات</span>
                    </li>
                    <li>
                        <LocalShippingOutlinedIcon className='icon' />
                        <span>ارسال</span>
                    </li>
                    <p className="title">مفيد</p>
                    <li>
                        <NotificationsNoneOutlinedIcon className='icon' />
                        <span>اعلانات</span>
                    </li>

                    <p className="title">مدير</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icon' />
                        <span>پروفايل </span>
                    </li>
                    <li onClick={handleLogout}>
                        <ExitToAppOutlinedIcon className='icon' />
                        <span>خروج</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
            </div>
        </div>
    )
}
