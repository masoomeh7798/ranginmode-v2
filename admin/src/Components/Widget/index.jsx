import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { AuthContext } from '../../Context/AuthContext';

export default function Widget({ type }) {
    let data;
    const [amount, setAmount] = useState();
    const {token}=useContext(AuthContext)
    useEffect(() => {
        (async()=>{
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + "user", {
                    method: "GET",
                    headers: {
                       authorization: `Bearer ${token}`
                    },
               
                });
                const data = await res.json();
                if (data?.success) {
                    setAmount(data?.count)
                } 
    
            } catch (error) {
                console.log(error);
            }
        })()
        
    }, []);
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

        default: break;
    }
    return (
        <div className='widget box-shadow'>
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
