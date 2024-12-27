import React from 'react'

export default function SingleSlider({item}) {
  return (
    <div className="item">
    <img src={import.meta.env.VITE_BASE_URL + item?.image} alt="img" className='itemImg' />
    <div className="details">
      <h2 className="itemTitle">{item?.title}</h2>
      <div className="itemInfo">
        <span className="itemKey">موقعيت در سايت:</span>
        <span className="itemValue">{item?.position == 'home' ? 'صفحه اصلي' : item?.position == 'discount' ? 'تخفيفات' : 'فرعي'}</span>
      </div>
      <div className="itemInfo">
        <span className="itemKey">لينك بشه به:</span>
        <span className="itemValue">{item?.href}</span>
      </div>
    </div>
  </div>
  )
}
