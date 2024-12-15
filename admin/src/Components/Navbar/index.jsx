import React, { useContext } from 'react'
import "./style.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, ListOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { DarkModeContext } from '../../Context/DarkModeContext.jsx';

export default function Navbar() {
  const {dispatch}=useContext(DarkModeContext)
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='اينجا پيدا كن...' />
          <SearchOutlinedIcon className='icon'/>
        </div>
        <div className="items">
          <div onClick={()=>dispatch({type:'TOGGLE'})} className="item">
            <DarkModeOutlined className='icon'/>
          </div>
          <div className="item">
            <FullscreenExitOutlined className='icon'/>
          </div>
          <div className="item">
            <NotificationsNoneOutlined className='icon'/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className='icon'/>
            <div className="counter">3</div>
          </div>
          <div className="item">
            <ListOutlined className='icon'/>
          </div>
          <div className="item">
            <img src="/public/87-512.webp" alt="avatar" className="avatar" />
          </div>
        </div>
      </div>
      <hr/>
    </div>
  )
}
