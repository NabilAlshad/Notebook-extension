import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React , {useState} from 'react'
import UpdateModal from '../UpdateModal/UpdateModal';


const ShowSingleBookmarks = ({bookmark, setIsModified, isModified}) => {
  const [updateData, setUpdateData] = useState <object>({})
  const [show, setShow] = useState <boolean> (false);
  const [isClick, setIsClick] = useState <boolean> (false);
  const deleteHandler=  async (e, id): Promise <void> => {
    e.preventDefault();
    const {data: {
      message,
      status
    }} = await axios.put (`http://localhost:4300/form/delete/${id}`)
    if (status == 202) {
      setIsModified (!isModified)
      alert(`Delete Successfully`)
    }else {
      alert(`Delete failed`)
    }
  }
  const handleClose = () => setShow(false);
  const updateHandler = (e, bookmark) => {
    e.preventDefault();
    setShow (true);
    setUpdateData (bookmark)
    setIsClick (!isClick);
  }
  return (
    <>
      <tr>
          <td>
            <a target = "_blank" href= {bookmark.link}>{bookmark.title}</a>
          </td>
          <td> 
            <button onClick={(e) => deleteHandler (e, bookmark._id) } >
              <FontAwesomeIcon icon ={["fas", "ban"]} />
            </button>
          </td>
          <td>   
            <button onClick={(e) => updateHandler (e, bookmark) } >
              <FontAwesomeIcon icon ={["fas", "file-pen"]} />
            </button>
          </td>
          <td style = {{textAlign: "justify"} }>
            {bookmark.description}
          </td>
      </tr>
      <UpdateModal 
          show = {show}
          handleClose = {handleClose}
          bookmark = {updateData}
          isClick = {isClick}
          setIsModified = {setIsModified}
          isModified = {isModified}
        />
    </>
  )
}

export default ShowSingleBookmarks