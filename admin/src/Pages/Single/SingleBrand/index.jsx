import React from 'react'

export default function SingleBrand({ item }) {
  return (
    <div className="item">
      <div className="details">
        <h2 className="itemTitle">{item?.title}</h2>
        <div className="itemInfo">
          <span className="itemKey">وضعيت در سايت:</span>
          <span className="itemValue">{item?.isActive ? 'فعال' : 'غيرفعال'}</span>
        </div>
      </div>
    </div>
  )
}
