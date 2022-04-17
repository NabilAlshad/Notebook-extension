import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import ShowSingleBookmarks from './SingleDemoBookmark/ShowSingleBookmarks'

const SingleDemoBookmark = ({
    bookmark
}) => {
    // console.log(bookmark)
    const [isUpdate, setIsUpdate] = useState <boolean> (false)
    const [hello, setHello] = useState <string> ("")
    
  return (
     <>
      <ShowSingleBookmarks bookmark={bookmark}/> 
    </>
  )
}

export default SingleDemoBookmark