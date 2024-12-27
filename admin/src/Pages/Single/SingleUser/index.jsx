import React from 'react'

export default function SingleUser({ item }) {
  return (
    <div className="item">
      <img src={import.meta.env.VITE_BASE_URL + item?.img} alt="img" className='itemImg' />
      <div className="details">
        <h2 className="itemTitle">{item?.fullName}</h2>
        <div className="itemInfo">
          <span className="itemKey">موبايل:</span>
          <span className="itemValue">{item?.phone}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">ايميل:</span>
          <span className="itemValue">{item?.email}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">رمز عبور:</span>
          <span className="itemValue">{item?.password}</span>
        </div>
        <div className="itemInfo">
          <span className="itemKey">نقش:</span>
          <span className="itemValue">{item?.role == 'admin' ? 'ادمين' : 'كاربر'}</span>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">محصولات محبوبش:</span>
          <div className="itemValue userItemValue">{item?.favoriteProductIds?.map((e, index) => (
            <div key={index} className='multiValueSpan'>
              <span>{e?.name}: </span>
              <img src={import.meta.env.VITE_BASE_URL + e?.images[0]} alt="img" className='itemImg2' />
            </div>
          ))}
          </div>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">محصولاتي كه اخيرا ديده:</span>
          <div className="itemValue userItemValue">{item?.recentlyProductIds?.map((e, index) => (
            <div key={index} className='multiValueSpan'>
              <span>{e?.name}: </span>
              <img src={import.meta.env.VITE_BASE_URL + e?.images[0]} alt="img" className='itemImg2' />
            </div>
          ))}
          </div>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">محصولاتي كه خريده:</span>
          <div className="itemValue userItemValue">{item?.boughtProduct?.map((e, index) => (
            <div key={index} className='multiValueSpan'>
              <span>{e?.name}: </span>
              <img src={import.meta.env.VITE_BASE_URL + e?.images[0]} alt="img" className='itemImg2' />
            </div>
          ))}
          </div>
        </div>
        <div className="itemInfo multiValue">
          <span className="itemKey">سبد خريدش:</span>
          <div className="itemValue userItemValue">
            <div className='multiValueSpan cart'>
              <div className="">
                <span>مجموع قيمت: </span>
                <span>{item?.cart?.totalPrice} </span>
              </div>
              {item?.cart?.items?.map((e,index)=>(
              <div key={index} className="">
                <span>{e?.productId?.name}</span>
                <span>{e?.quantity}</span>
                <img src={import.meta.env.VITE_BASE_URL + e?.productId?.images[0]} alt="img" className='itemImg2' />
              </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
