import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.scss"
import { DarkModeContext } from '../../Context/DarkModeContext.jsx';
import { AuthContext } from '../../Context/AuthContext.jsx';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { SidebarContext } from '../../Context/SidebarContext.jsx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { OrderContext } from '../../Context/OrderContent.jsx';


export default function Navbar() {
  const { dispatch } = useContext(DarkModeContext)
  const { user ,token} = useContext(AuthContext)
  const { dispatch: sidebarDispatch, isOpenSidebar } = useContext(SidebarContext)
  const {newOrder}=useContext(OrderContext)
  const [numOfNewOrders, setNumOfNewOrders] = useState(0);

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

  // get the number of new orders for notification icon
  useEffect(() => {
    (async()=>{
      try {
      const res=await fetch(`${import.meta.env.VITE_BASE_API}order?filters[status][$eq]=failed`,{
        method:'GET',
        headers:{
          authorization:`Bearer ${token}`,
          "content-type":'application/json'
        }
      })
      const data=await res.json()
      console.log(data);
      if(data?.success){
        setNumOfNewOrders(data?.count)
      }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [newOrder]);


  return (
    <>
      <div className='navbar navbar-responsive'>
        <div className="wrapper">
          <div onClick={() => { sidebarDispatch({ type: 'TOGGLE_SIDEBAR' }) }} className="hamburgerMenu">
            <MenuOutlinedIcon />
          </div>
          <div className="items">
            <div className="item">
              <CircleNotificationsIcon className='icon' />
              <div className="counter">{numOfNewOrders}</div>
            </div>
            <div onClick={() => dispatch({ type: 'TOGGLE' })} className="item">
              <Brightness4Icon className='icon' />
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
          className='backdrop-mobile'
          sx={(theme) => ({ color: '#fff', zIndex: 900,display:'none' })}
          open={isOpenSidebar}
          onClick={handleClose}
        >
        </Backdrop>
      </div>
    </>
  )
}
