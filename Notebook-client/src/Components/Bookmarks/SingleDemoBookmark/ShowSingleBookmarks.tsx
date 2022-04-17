import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ShowSingleBookmarks = ({bookmark}) => {
  return (
    <tr>
        <td>
          <a target = "_blank" href= {bookmark.link}>{bookmark.title}</a>
        </td>
        <td>
          <FontAwesomeIcon icon ={["fas", "ban"]} />
        </td>
        <td>
          <FontAwesomeIcon icon ={["fas", "file-pen"]} />
        </td>
    </tr>
  )
}

export default ShowSingleBookmarks