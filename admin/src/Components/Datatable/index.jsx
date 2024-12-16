import React, { useState } from 'react'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatableSource.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const paginationModel = { page: 0, pageSize: 8 };




export default function Datatable() {
    const [data, setData] = useState(userRows);
    const handleDeleteRow = (id) => {
        setData(data?.filter(row => row.id !== id))
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "گزينه ها",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="actionButtons">
                        <Link to='/users/test' className='viewBtn'>
                            <VisibilityIcon />
                        </Link>
                        <span onClick={() => handleDeleteRow(params.row.id)} className="deleteBtn">
                            <CloseIcon />
                        </span>
                    </div>
                )
            }
        }
    ]
    return (
        <div className='datatable'>
            <div className="dataTableTitle">
                <Button href='/users/new'
                    sx={{
                        color: "purple",
                        borderColor: "purple",
                        fontSize: 20
                    }}
                    variant="outlined">+ افزودن كاربر جديد</Button>
            </div>
            <DataGrid
                className='datagrid'
                rows={data}
                columns={userColumns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
            />
        </div>
    )
}
