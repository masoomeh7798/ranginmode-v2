import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';
import notify from '../../Utils/notify';

const paginationModel = { page: 0, pageSize: 10 };

export default function Datatable({ rows, columns, rowType }) {
    const { token } = useContext(AuthContext)
    const [rowsData, setRowsData] = useState([]);
    const [columnsData, setColumnsData] = useState([]);


    useEffect(() => {
        setRowsData(rows);
        setColumnsData(columns);
    }, [rows, columns]);


    const handleDeleteRow = async (id) => {
        setRowsData(rowsData?.filter(row => row._id !== id))
        try {
            const res = await fetch(import.meta.env.VITE_BASE_API + `${rowType}/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Baerer ${token}`
                }
            })
            const data = await res.json()
            if (data.success) {
                notify('success', data.message)
            } else {
                notify('error', data?.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "گزينه ها",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="actionButtons">
                        <Link to={`/${rowType == 'category' ? 'categories' : rowType + 's'}/${params?.row?._id}`} className='viewBtn'>
                            <VisibilityIcon />
                        </Link>
                        <Link to={`/${rowType == 'category' ? 'categories' : rowType + 's'}/edit/${params?.row?._id}`} className='editBtn' style={{ display: rowType == 'slider' && 'none' }} >
                            <EditOutlinedIcon />
                        </Link>
                        <span onClick={() => handleDeleteRow(params.row._id)} className="deleteBtn"
                            style={{ display: (rowType == 'user' || rowType == 'product' || rowType == 'brand' || rowType == 'category') && 'none' }}>
                            <CloseIcon />
                        </span>
                    </div>
                )
            }
        }
    ]
    return (
        <div className='datatable'>
            <div className="dataTableTitle box-shadow">
                <Typography
                    component={'h1'}
                    fontSize={24}
                >{rowType == 'user' ? 'كاربران' :
                    rowType == 'product' ? 'محصولات' :
                        rowType == 'product-variant' ? 'زيرشاخه ي محصولات' :
                            rowType == 'brand' ? 'برند ها' :
                                rowType == 'category' ? 'دسته بندي ها' : rowType == 'comment' ? 'نظرات':
                                rowType == 'order' ? 'سفارشات' 
                                : 'اسلايد ها'
                    }</Typography>
            </div>
            <div style={{ width: '100%', overflowX: 'scroll' }}>
                <DataGrid
                    className='datagrid'
                    rows={rowsData}
                    columns={columnsData.concat(actionColumn)}
                    initialState={{ pagination: { paginationModel } }}
                    disableRowSelectionOnClick
                  
                />
            </div>
        </div>
    )
}
