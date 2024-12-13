import React from 'react'
import "./style.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export default function Widget({ type }) {
    let data;
    let amount = 1000
    switch (type) {
        case 'user':
            data = {
                title: "كاربران",
                isMoney: false,
                link: "مشاهده همه كاربران",
                icon: <PersonOutlineOutlinedIcon className='icon' sx={{color:'var(--secondary-clr)',bgcolor:'rgba(255,0,0,.2)'}}/>
            }
            break;
        case 'order':
            data = {
                title: "سفارشات",
                isMoney: false,
                link: "مشاهده همه سفارشات",
                icon: <ShoppingCartOutlinedIcon className='icon' sx={{color:'#BA8E23',bgcolor:'rgba(255,255,0,.2)'}} />
            }
            break;
        case 'earning':
            data = {
                title: "درآمد",
                isMoney: true,
                link: "مشاهده كل درآمد",
                icon: <MonetizationOnOutlinedIcon className='icon'  sx={{color:'green',bgcolor:'rgba(0,255,0,.2)'}} />
            }
            break;
        case 'balance':
            data = {
                title: 'تراز',
                isMoney: true,
                link: "مشاهده جزئيات",
                icon: <AccountBalanceWalletOutlinedIcon className='icon'  sx={{color:'purple',bgcolor:'rgba(160,32,240,.2)'}} />
            }
            break;
        default: break;
    }
    return (
        <div className='widget'>
            <div className="right">
                <span className="title">{data.title}</span>
                <span className="counter">{amount} {data.isMoney && 'ت'}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="left">
                {data.icon}
            </div>
        </div>
    )
}
