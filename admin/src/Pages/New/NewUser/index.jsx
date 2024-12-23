import React, { useState } from 'react'
import "./../style.scss"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function NewUser() {
  const [file, setFile] = useState();
  return (
    <>
      
      <div className="bottom box-shadow">
        <div className="right">
          <div className="uploadFile">
            <label htmlFor="file">
              <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
              <div className="fileIcon">
                <AddOutlinedIcon />
              </div>
            </label>
            <input onChange={e => setFile(e.target.files[0])} type="file" id='file' style={{ display: 'none' }} />
          </div>
        </div>
        <div className="left">
          <form>
       
            <br />
            <button type='submit'>ثبت</button>
          </form>
        </div>
      </div>
    </>
  )
}
