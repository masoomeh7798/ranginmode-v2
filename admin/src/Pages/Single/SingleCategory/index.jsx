import React from 'react'

export default function SingleCategory({ item }) {
  return (
    <div className="item">
      <img src={import.meta.env.VITE_BASE_URL + item?.image} alt="img" className='itemImg' />
      <div className="details">
        <h2 className="itemTitle">{item?.title}</h2>
        <div className="itemInfo">
          <span className="itemKey">زيردسته براي:</span>
          <span className="itemValue">{item?.subCategory?.title}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">وضعيت در سايت:</span>
          <span className="itemValue">{item?.isActive ? 'فعال' : 'غيرفعال'}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">نوع دسته بندي:</span>
          <span className="itemValue">{item?.isMain ? 'اصلي' : 'فرعي'}</span>
        </div>
      </div>
    </div>
  )
}


