import React, { useEffect, useState } from 'react'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatableSource.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const paginationModel = { page: 0, pageSize: 8 };

export default function Datatable({ rows,columns,rowType }) {

    const [rowsData, setRowsData] = useState(rows);
    const [columnsData, setColumnsData] = useState(rows);

    useEffect(() => {
        setRowsData(rows);
        setColumnsData(columns);
    }, [rows,columns]);

    const handleDeleteRow = (id) => {
        setRowsData(rowsData?.filter(row => row._id !== id))
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "گزينه ها",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="actionButtons">
                        <Link to={`/${rowType}/${params?.row?._id}`} className='viewBtn'>
                            <VisibilityIcon />
                        </Link>
                        <span onClick={() => handleDeleteRow(params.row._id)} className="deleteBtn">
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
                    variant="outlined">{rowType=='users' ?'+ افزودن كاربر جديد' :'+ افزودن محصول جديد'}</Button>
            </div>
            <DataGrid
                className='datagrid'
                rows={rowsData}
                columns={columnsData.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
            />
        </div>
    )
}
