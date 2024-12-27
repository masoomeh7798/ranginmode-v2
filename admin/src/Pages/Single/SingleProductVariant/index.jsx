import React from 'react'

export default function SingleProductVariant({ item }) {
  return (
    <div className="item">
      <div className="details">
        <h2 className="itemTitle">{item?.name}</h2>
        <div className="itemInfo">
          <span className="itemKey">تعداد:</span>
          <span className="itemValue">{item?.quantity}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">قيمت:</span>
          <span className="itemValue">{item?.price}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">تخفيف:</span>
          <span className="itemValue">{item?.discount}%</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">قيمت نهايي:</span>
          <span className="itemValue">{item?.finalPrice}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">براي محصولِ:</span>
          <span className="itemValue">{item?.productId?.name}</span>
        </div>

      </div>
    </div>
  )
}
