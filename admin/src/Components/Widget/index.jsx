import React from 'react'
import "./style.scss"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Widget() {
  return (
    <div className='widget'>
        <div className="right">
            <span className="title">كاربران</span>
            <span className="counter">86574</span>
            <span className="link">مشاهده همه كاربران</span>
        </div>
        <div className="left">
            <AccountBoxIcon className='icon'/>
        </div>
    </div>
  )
}
