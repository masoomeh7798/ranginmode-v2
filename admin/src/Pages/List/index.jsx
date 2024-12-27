import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from "../../Components/Navbar"
import Datatable from '../../Components/Datatable'
import { AuthContext } from '../../Context/AuthContext'
import { columns } from '../../datatableSource'

export default function List({ rowType }) {
    // product and user list data
    const [rows, setRows] = useState([]);
    const { token } = useContext(AuthContext)

    const fetchListData = async (rowType) => {
        if (token) {
            (async () => {
                try {
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


                } catch (error) {
                    console.log(error);
                }
            })()

        }
    }

    useEffect(() => {
        fetchListData(rowType)
    }, [token, rowType]);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable rows={rows} columns={columns(rowType)} rowType={rowType} />
            </div>
        </div>
    )
}
