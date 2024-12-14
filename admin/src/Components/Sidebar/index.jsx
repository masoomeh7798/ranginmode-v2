import React from 'react'
import "./style.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="top">
            <Link to='/'>
            <span className="logo">مدير سايت</span>
            </Link>
            </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">اصلي</p>
                <Link to='/'>
                <li>
                    <DashboardIcon className='icon'/>
                    <span>داشبورد</span>
                </li>
                </Link>
                <p className="title">ليست ها</p>
                <Link to='/users'>
                <li>
                    <PersonOutlineOutlinedIcon className='icon'/>
                    <span>كاربران</span>
                </li>
                </Link>
                <Link to='/products'>
                <li>
                    <StorefrontOutlinedIcon className='icon'/>
                    <span>محصولات</span>
                </li>
                </Link>
                <li>
                    <CreditCardOutlinedIcon className='icon'/>
                    <span>سفارشات</span>
                </li>
                <li>
                    <LocalShippingOutlinedIcon className='icon'/>
                    <span>ارسال</span>
                </li>
                <p className="title">مفيد</p>
                <li>
                    <InsertChartOutlinedIcon className='icon'/>
                    <span>وضعيت</span>
                </li>
                <li>
                    <NotificationsNoneOutlinedIcon className='icon'/>
                    <span>اعلانات</span>
                </li>
                <p className="title">خدمات</p>
                <li>
                    <span>سلامت سيستم</span>
                </li>
                <li>
                    <span>لاگز</span>
                </li>
                <li>
                    <SettingsSuggestOutlinedIcon className='icon'/>
                    <span>تنظيمات</span>
                </li>
                <p className="title">مدير</p>
                <li>
                    <AccountCircleOutlinedIcon className='icon'/>
                    <span>پروفايل </span>
                </li>
                <li>
                    <ExitToAppOutlinedIcon className='icon'/>
                    <span>خروج</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
        </div>
    </div>
  )
}
