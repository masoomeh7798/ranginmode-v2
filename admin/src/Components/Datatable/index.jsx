import React from 'react'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatableSource.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const paginationModel = { page: 0, pageSize:8 };

const actionColumn = [
    {
        field: "action",
        headerName: "گزينه ها",
        width: 200,
        renderCell: () => {
            return (
                <div className="actionButtons">
                    <span className="viewBtn">
                        <VisibilityIcon />
                    </span>
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
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
            />
        </div>
    )
}
