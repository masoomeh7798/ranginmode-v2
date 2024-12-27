import React from 'react'

export default function SingleProduct({ item }) {
  return (
    <div className="item">
      <div className="details">
        <h2 className="itemTitle">{item?.name}</h2>
        <div className="itemInfo">
          <span className="itemKey">توضيحات:</span>
          <span className="itemValue">{item?.description}</span>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">مشخصات فني:</span>
          <div className="itemValue">{item?.information?.map((e, index) => (
            <div key={index}>
              <span>{e?.name}: </span>
              <span> {e?.value}</span>
            </div>
          ))}
          </div>
        </div>
        <div className="itemInfo">
          <span className="itemKey">وضعيت در سايت:</span>
          <span className="itemValue">{item?.isActive ? 'فعال' : 'غيرفعال'}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">دسته بندي:</span>
          <span className="itemValue">{item?.categoryId?.title }</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">برند:</span>
          <span className="itemValue">{item?.brandId?.title }</span>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">زيرشاخه ها:</span>
          <div className="itemValue">{item?.productVariantIds?.map((e, index) => (
            <div key={index} className='multiValueSpan'>
              <span>{e?.name} </span>
              <span> {e?.quantity} عدد</span>
              <span> {e?.price} تومان</span>
              <span> {e?.discount} % تخفيف</span>
              <span>پس از تخفيف {e?.finalPrice} تومان</span>
            </div>
          ))}
          </div>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey ">عكس ها:</span>
          <span className="itemValue ">{item?.images?.map((e, index) => (
            <img key={index} src={import.meta.env.VITE_BASE_URL + e} alt={item?.name} className='itemImg' />
          ))}</span>
        </div>
      </div>
    </div>
  )
}
