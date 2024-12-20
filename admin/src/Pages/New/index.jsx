import React, { useState } from 'react'
import "./style.scss"
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function New({ inputs, title }) {
    const [file, setFile] = useState();
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top box-shadow">
                    <h1>{title}</h1>
                </div>
                <div className="bottom box-shadow">
                    <div className="right">
                        <div className="uploadFile">
                            <label htmlFor="file">
                                <img src={file ? URL.createObjectURL(file) :"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
                                <div className="fileIcon">
                                    <AddOutlinedIcon />
                                </div>
                            </label>
                            <input onChange={e=>setFile(e.target.files[0])} type="file" id='file' style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className="left">
                        <form>
                            {inputs?.map((input,index )=> (
                                <div key={input?.id} 
                                className={`formInput ${index=== inputs?.length-1 ? "last-input" : ""}`}>
                                    <label>{input?.label}</label>
                                    <input type={input?.type} placeholder={input?.placeholder} />
                                </div>
                            ))}
                            <br/>
                            <button type='submit'>ثبت</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
