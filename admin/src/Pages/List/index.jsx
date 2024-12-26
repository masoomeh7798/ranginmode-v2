import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from "../../Components/Navbar"
import Datatable from '../../Components/Datatable'
import { AuthContext } from '../../Context/AuthContext'
import { productColumns, userColumns } from '../../datatableSource'

export default function List({ rowType }) {
    // product and user list data
    const [rows, setRows] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const { token } = useContext(AuthContext)

    const fetchListData = async (rowType) => {
        const res = await fetch(import.meta.env.VITE_BASE_API + rowType, {
            'method': 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        if (data?.success) {
            setRows(data?.data?.map((item, index) => ({ ...item, id: index + 1 })))
        }
    }

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    fetchListData(rowType)
                } catch (error) {
                    console.log(error);
                }
            })()

        }
    }, [token,rowType]);

    const columnsToDisplay = rowType === 'products' ? productColumns : userColumns;

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable rows={rows} columns={columnsToDisplay} rowType={rowType} />
            </div>
        </div>
    )
}
