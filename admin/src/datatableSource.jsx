export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70},
    {
        field: 'user', headerName: "كاربر", width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={import.meta.env.VITE_BASE_URL+params.row.img} alt={params.row.fullName} />
                    {params.row.fullName}
                </div>
            )
        }
    },
    { field: "email", headerName: "ايميل", width: 230 },
    { field: "phone", headerName: "موبايل", width: 150 },
    
]
export const productColumns = [
    { field: 'id', headerName: 'ID', width: 70},
    {
        field: 'product', headerName: "محصول", width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={import.meta.env.VITE_BASE_URL+params.row.images[0]} alt={params.row.name} />
                    {params.row.name}
                </div>
            )
        }
    },
    { field: "finalPrice", headerName: "قيمت نهايي", width: 230 },
    { field: "price", headerName: "قيمت", width: 230 },
    { field: "discount", headerName: "تخفيف", width: 150 },
    { field: "quantity", headerName: "تعداد", width: 150 },
    
]



