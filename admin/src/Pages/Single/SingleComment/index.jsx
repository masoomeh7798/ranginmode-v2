import React from 'react'

export default function SingleComment({item}) {
  return (
    <div className="item">
    <div className="details">
      <h2 className="itemTitle">{item?.isPublish ? 'منتشر شده' : 'منتشر نشده'}</h2>
      <div className="itemInfo">
        <span className="itemKey">کاربر:</span>
        <span className="itemValue">{item?.userId?.fullName}</span>
      </div>
      <div className="itemInfo">
        <span className="itemKey">محصول:</span>
        <span className="itemValue">{item?.productId?.name}</span>
      </div>
      <div className="itemInfo">
        <span className="itemKey">متن:</span>
        <span className="itemValue">{item?.content}</span>
      </div>

    </div>
  </div>
  )
}
