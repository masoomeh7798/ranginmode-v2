import React from 'react'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatableSource.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const paginationModel = { page: 0, pageSize: 8 };

const actionColumn = [
    {
        field: "action",
        headerName: "گزينه ها",
        width: 200,
        renderCell: () => {
            return (
                <div className="actionButtons">
                    <Link to='/users/test' className='viewBtn'>
                        <VisibilityIcon />
                    </Link>
                    <span className="deleteBtn">
                        <CloseIcon />
                    </span>
                </div>
            )
        }
    }
]



export default function Datatable() {
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
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
            />
        </div>
    )
}
