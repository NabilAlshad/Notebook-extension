import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import ShowSingleBookmarks from './SingleDemoBookmark/ShowSingleBookmarks'

const SingleDemoBookmark = ({
    bookmark,
    setIsModified,
    isModified
}) => {
    // console.log(bookmark)
    const [isUpdate, setIsUpdate] = useState <boolean> (false)
    const [hello, setHello] = useState <string> ("")
    
  return (
     <>
      <ShowSingleBookmarks bookmark={bookmark} setIsModified = {setIsModified} isModified = {isModified}/> 
    </>
  )
}

export default SingleDemoBookmark