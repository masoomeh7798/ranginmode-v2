import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, ListOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { DarkModeContext } from '../../Context/DarkModeContext.jsx';
import { AuthContext } from '../../Context/AuthContext.jsx';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { SidebarContext } from '../../Context/SidebarContext.jsx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Navbar() {
  const { dispatch } = useContext(DarkModeContext)
  const { user } = useContext(AuthContext)
  const { dispatch: sidebarDispatch, isOpenSidebar } = useContext(SidebarContext)


  // backdrop
  // Control body overflow based on sidebar state
  useEffect(() => {
    if (isOpenSidebar) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    // Cleanup function to reset overflow on unmount
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpenSidebar]);

  const handleClose = () => {
    sidebarDispatch({ type: 'TOGGLE_SIDEBAR' })
  };


  return (
    <>
      <div className='navbar navbar-responsive'>
        <div className="wrapper">
          <div onClick={() => { sidebarDispatch({ type: 'TOGGLE_SIDEBAR' }) }} className="hamburgerMenu">
            <MenuOutlinedIcon />
          </div>

          {/* <div className="search">
          <input type="text" placeholder='اينجا پيدا كن...' />
          <SearchOutlinedIcon className='icon'/>
        </div> */}
          <div className="items">
            <div onClick={() => dispatch({ type: 'TOGGLE' })} className="item">
              <DarkModeOutlined className='icon' />
            </div>
            <div className="item">
              <NotificationsNoneOutlined className='icon' />
              <div className="counter">1</div>
            </div>
            <div className="item">
              <img src={import.meta.env.VITE_BASE_URL + user?.img} alt="avatar" className="avatar" />
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex:900 })}
          open={isOpenSidebar}
          onClick={handleClose}
        >
        </Backdrop>
      </div>
    </>
  )
}
