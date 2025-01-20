export const columns = (rowType) => {

    switch (rowType) {
        case 'user':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'user', headerName: "كاربر", width: 200,
                    renderCell: (params) => {
                        const imageSrc = params?.row?.img
                            ? import.meta.env.VITE_BASE_URL + params?.row?.img
                            : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
                        return (
                            <div className="cellWithImg">
                                <img className="cellImg" src={imageSrc} alt={params?.row?.fullName?.split(' ').slice(0, 2).join(' ')} />
                                {params?.row?.fullName?.split(' ')?.slice(0, 2)?.join(' ')}
                            </div>
                        )
                    }
                },
                { field: "email", headerName: "ايميل", maxWidth: 230 },
                {
                    field: "role", headerName: "نقش", width: 80,
                    renderCell: (params) => (
                        <p>{params?.row?.role == 'admin' ? 'ادمين' : 'كاربر'}</p>
                    )
                },
                { field: "phone", headerName: "موبايل", width: 150 },

            ]

        case 'product':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'product', headerName: "محصول", width: 200,
                    renderCell: (params) => {
                        const imageSrc = (params?.row?.images && params.row.images.length > 0)
                            ? import.meta.env.VITE_BASE_URL + params.row.images[0]
                            : '';
                        return (
                            <div className="cellWithImg">
                                <img className="cellImg"
                                    src={imageSrc} alt={params?.row?.name} />
                                {params?.row?.name}
                            </div>
                        )
                    }
                },
                {
                    field: "isActive", headerName: "موجودي", width: 100,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.isActive ? 'موجود' : 'ناموجود'}</p>
                            </div>
                        )
                    }
                },
                {
                    field: "category", headerName: "دسته بندي", width: 150,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.categoryId?.title}</p>
                            </div>
                        )
                    }
                },
                {
                    field: "brand", headerName: "برند", width: 100,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.brandId?.title}</p>
                            </div>
                        )
                    }
                },
            ]
        case 'product-variant':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'name', headerName: "نام", width: 150
                },
                { field: "quantity", headerName: "تعداد", width: 150 },
                { field: "price", headerName: "قيمت", width: 150 },
                {
                    field: "discount", headerName: "تخفيف", width: 70,
                    renderCell: (params) => (
                        <p>{params?.row?.discount}%</p>
                    )
                },
                { field: "finalPrice", headerName: "قيمت نهايي", width: 150 },
                {
                    field: "product", headerName: "براي محصولِ:", maxWidth: 150,
                    renderCell: (params) => (
                        <p>{params?.row?.productId?.name}</p>
                    )
                },

            ]
        case 'brand':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                { field: 'title', headerName: 'نام', width: 100 },
                {
                    field: "isActive", headerName: "فعال", width: 70,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.isActive ? 'فعال' : 'غيرفعال'}</p>
                            </div>
                        )
                    }
                },
            ]

        case 'category':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'cat', headerName: "دسته بندي", width: 200,
                    renderCell: (params) => {
                        const imageSrc = params?.row?.image
                            ? import.meta.env.VITE_BASE_URL + params.row.image
                            : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
                        return (
                            <div className="cellWithImg">
                                <img className="cellImg" src={imageSrc} alt={params?.row?.title} />
                                {params?.row?.title}
                            </div>
                        )
                    }
                },

                {
                    field: "subCat", headerName: "زيردسته براي", width: 120,
                    renderCell: (params) => (
                        <p>{params?.row?.subCategory?.title}</p>
                    )
                },
                {
                    field: "isActive", headerName: "فعال", width: 70,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.isActive ? 'فعال' : 'غيرفعال'}</p>
                            </div>
                        )
                    }
                }, {
                    field: "isMain", headerName: "اصلي", width: 70,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.isMain ? 'اصلي' : 'فرعي'}</p>
                            </div>
                        )
                    }
                },
            ]
        case 'slider':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'slide', headerName: "اسلايد", width: 200,
                    renderCell: (params) => {

                        return (
                            <div className="cellWithImg">
                                <img className="cellImg" src={import.meta.env.VITE_BASE_URL + params.row.image} alt={params?.row?.title} />
                                {params?.row?.title}
                            </div>
                        )
                    }
                },
                {
                    field: "position", headerName: "موقعيت", width: 100,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.position == 'home' ? 'صفحه اصلي' : params?.row?.position == 'discount' ? 'تخفيفات' : 'فرعي'}</p>
                            </div>
                        )
                    }
                },
            ]
        case 'comment':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'user', headerName: "کاربر", width: 120,
                    renderCell: (params) => {
                        return (
                            <div >
                                <p>{params?.row?.userId?.fullName}</p>
                            </div>
                        )
                    }
                },
                {
                    field: 'product', headerName: "محصول", width: 140,
                    renderCell: (params) => {
                        return (
                            <div >
                                <p>{params?.row?.productId?.name}</p>
                            </div>
                        )
                    }
                },
                {
                    field: 'content', headerName: "محتوا", width: 200,
                    renderCell: (params) => {
                        return (
                            <div >
                                <p>{params?.row?.content?.split(' ')?.slice(0, 3).join(' ')}...</p>
                            </div>
                        )
                    }
                },
                {
                    field: "isPublish", headerName: "وضعیت انتشار", width: 150,
                    renderCell: (params) => {
                        return (
                            <div>
                                <p>{params?.row?.isPublish ? 'منتشر شده' : 'منتشر نشده'}</p>
                            </div>
                        )
                    }
                },
            ]
        case 'order':
            return [
                { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
                {
                    field: 'user', headerName: "کاربر", width: 120,
                    renderCell: (params) => {
                        return (
                            <div >
                                <p>{params?.row?.userId ? params?.row?.userId?.fullName : 'مهمان'}</p>
                            </div>
                        )
                    }
                },
                {
                    field: 'totalPrice', headerName: 'مبلغ (تومان)', width: 120,
                    renderCell: (params) => (
                        <p>{(params?.row?.totalPrice)?.toLocaleString()}</p>
                    )
                },
                {
                    field: "status", headerName: "وضعیت پرداخت", width: 150,
                    renderCell: (params) => {
                        return (
                            <div>
                                <p style={{
                                    color: params?.row?.status == 'success' ? 'green' :
                                        params?.row?.status == 'failed' ? 'red' :
                                            'yellow'
                                }}>
                                    {params?.row?.status == 'success' ? 'موفقيت آميز' :
                                        params?.row?.status == 'failed' ? "دريافت خطا" :
                                            "در حال پرداخت"
                                    }
                                </p>
                            </div>
                        )
                    }
                },
                {
                    field: "process", headerName: "وضعیت سفارش", width: 150,
                    renderCell: (params) => {
                        return (
                            <div>
                                <p>{params?.row?.process == 'review' ? 'در حال بررسي' :
                                    params?.row?.status == 'progress' ? "در حال انجام" :
                                        params?.row?.status == 'completed' ? "تكميل شده" :
                                            params?.row?.status == 'sent' ? "ارسال شده" :
                                                "لغو شده"
                                }</p>
                            </div>
                        )
                    }
                },
            ]

        default:
            return [];
    }
}



