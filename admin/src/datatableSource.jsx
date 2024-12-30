export const columns = (rowType) => {

    switch (rowType) {
        case 'user':
            return [
                { field: 'id', headerName: 'ID', width: 70 },
                {
                    field: 'user', headerName: "كاربر", width: 230,
                    renderCell: (params) => {
                        const imageSrc = params?.row?.img
                        ? import.meta.env.VITE_BASE_URL + params.row.img
                        : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
                        return (
                            <div className="cellWithImg">
                                <img className="cellImg" src={imageSrc} alt={params.row.fullName} />
                                {params.row.fullName}
                            </div>
                        )
                    }
                },
                { field: "email", headerName: "ايميل", width: 230 },
                { field: "phone", headerName: "موبايل", width: 150 },
                {
                    field: "role", headerName: "نقش", width: 150,
                    renderCell: (params) => (
                        <p>{params?.row?.role == 'admin' ? 'ادمين' : 'كاربر'}</p>
                    )
                },

            ]

        case 'product':
            return [
                { field: 'id', headerName: 'ID', width: 70 },
                {
                    field: 'product', headerName: "محصول", width: 230,
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
                    field: "isActive", headerName: "موجودي", width: 150,
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
                    field: "brand", headerName: "برند", width: 150,
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
                { field: 'id', headerName: 'ID', width: 70 },
                {
                    field: 'name', headerName: "نام", width: 150
                },
                { field: "quantity", headerName: "تعداد", width: 150 },
                { field: "price", headerName: "قيمت", width: 150 },
                {
                    field: "discount", headerName: "تخفيف", width: 150,
                    renderCell: (params) => (
                        <p>{params?.row?.discount}%</p>
                    )
                },
                { field: "finalPrice", headerName: "قيمت نهايي", width: 150 },
                {
                    field: "product", headerName: "براي محصولِ:", width: 150,
                    renderCell: (params) => (
                        <p>{params?.row?.productId?.name}</p>
                    )
                },

            ]
        case 'brand':
            return [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'title', headerName: 'نام', width: 150 },
                {
                    field: "isActive", headerName: "فعال", width: 150,
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
                { field: 'id', headerName: 'ID', width: 70 },
                {
                    field: 'cat', headerName: "دسته بندي", width: 230,
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
                    field: "subCat", headerName: "زيردسته براي:", width: 150,
                    renderCell: (params) => (
                        <p>{params?.row?.subCategory?.title}</p>
                    )
                },
                {
                    field: "isActive", headerName: "فعال", width: 150,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.isActive ? 'فعال' : 'غيرفعال'}</p>
                            </div>
                        )
                    }
                }, {
                    field: "isMain", headerName: "اصلي", width: 150,
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
                { field: 'id', headerName: 'ID', width: 70 },
                {
                    field: 'slide', headerName: "اسلايد", width: 230,
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
                    field: "position", headerName: "موقعيت", width: 150,
                    renderCell: (params) => {
                        return (
                            <div className="cellWithImg">
                                <p>{params?.row?.position == 'home' ? 'صفحه اصلي' : params?.row?.position == 'discount' ? 'تخفيفات' : 'فرعي'}</p>
                            </div>
                        )
                    }
                },
            ]

        default:
            return [];
    }
}



