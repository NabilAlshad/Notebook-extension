import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import ShowSingleBookmarks from './SingleDemoBookmark/ShowSingleBookmarks'

const SingleDemoBookmark = ({
    bookmark,
    setIsModified,
    isModified
}) => {
  return (
     <>
      <ShowSingleBookmarks bookmark={bookmark} setIsModified = {setIsModified} isModified = {isModified}/> 
    </>
  )
}

export default SingleDemoBookmark