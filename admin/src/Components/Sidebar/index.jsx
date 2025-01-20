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
import { SidebarContext } from '../../Context/SidebarContext.jsx';
import { OrderContext } from '../../Context/OrderContent.jsx';


export default function Sidebar() {
    const { dispatch } = useContext(DarkModeContext)
    const { dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const {isOpenSidebar,dispatch:sidebarDispatch}=useContext(SidebarContext)
    const {numOfNewOrders}=useContext(OrderContext)

    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        authDispatch({ type: 'CLEAR_TOKEN' });
    }


    return (
        <>
            <div className={`sidebar sidebar-responsive ${isOpenSidebar && 'sidebar-onclick'}`}>
                <div className="top">
                    <Link to='/'>
                        <span className="logo">مدير سايت</span>
                    </Link>
                </div>
                <hr />
                <div className="center">
                    <ul>
                        <p className="title" >اصلي</p>
                        <Link to='/' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <DashboardIcon className='icon' />
                                <span>داشبورد</span>
                            </li>
                        </Link>
                        <p className="title">ليست ها</p>
                        <Link to='/new' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <AddOutlinedIcon className='icon' />
                                <span>افزودن موارد جديد</span>
                            </li>
                        </Link>
                        <Link to='/users'  onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <PersonOutlineOutlinedIcon className='icon' />
                                <span>كاربران</span>
                            </li>
                        </Link>
                        <Link to='/products' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <StorefrontOutlinedIcon className='icon' />
                                <span>محصولات</span>
                            </li>
                        </Link>
                        <Link to='/product-variants' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <CategoryOutlinedIcon className='icon' />
                                <span> زيرشاخه ي محصولات</span>
                            </li>
                        </Link>
                        <Link to='/brands' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <Brightness7OutlinedIcon className='icon' />
                                <span>برند ها</span>
                            </li>
                        </Link>
                        <Link to='/categories' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <ViewCompactOutlinedIcon className='icon' />
                                <span>دسته بندي ها</span>
                            </li>
                        </Link>
                        <Link to='/sliders' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <ViewCarouselOutlinedIcon className='icon' />
                                <span>اسلايد ها</span>
                            </li>
                        </Link>
                        <Link to='/comments' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                            <li>
                                <ChatOutlinedIcon className='icon' />
                                <span>نظرات</span>
                            </li>
                        </Link>

                        <Link  to='/orders' onClick={()=>sidebarDispatch({type:'TOGGLE_SIDEBAR'})}>
                        <li>
                            <CreditCardOutlinedIcon className='icon' />
                            <span>سفارشات</span>
                            <p className='counter'>{numOfNewOrders}</p>
                        </li>
                        </Link>

                        <p className="title">مدير</p>
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
        </>
    )
}
