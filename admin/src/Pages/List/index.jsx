import React, { useContext, useEffect, useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from "../../Components/Navbar"
import Datatable from '../../Components/Datatable'
import { AuthContext } from '../../Context/AuthContext'
import { productColumns, userColumns } from '../../datatableSource'

export default function List({ rowType }) {
    // product and user list data
    const [userRows, setUserRows] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    // users
                    const res = await fetch(import.meta.env.VITE_BASE_API + 'user', {
                        'method': 'GET',
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    const data = await res.json()
                    if (data?.success) {
                        setUserRows(data?.data?.map((user,index)=>({...user,id:index+1})))
                    }

                    // products
                    const resC = await fetch(import.meta.env.VITE_BASE_API + 'product', {
                        'method': 'GET',
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    const dataC = await resC.json()
                    if (dataC?.success) {
                        setProductRows(dataC?.data?.products?.map((product,index)=>({...product,id:index+1})))
                    }

                } catch (error) {
                    console.log(error);
                }
            })()

        }
    }, [token]);

    const rowsToDisplay = rowType === 'products' ? productRows : userRows;
    const columnsToDisplay = rowType === 'products' ? productColumns : userColumns;

console.log(rowsToDisplay);
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable rows={rowsToDisplay}  columns={columnsToDisplay} rowType={rowType} />
            </div>
        </div>
    )
}
