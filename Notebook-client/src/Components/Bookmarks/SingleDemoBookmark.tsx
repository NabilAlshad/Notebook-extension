import React from 'react'

const SingleDemoBookmark = ({
    bookmark
}) => {
    console.log(bookmark)
  return (
    <div>
        <h1>{bookmark.title}</h1>
        <h1>{bookmark.description}</h1>
    </div>
  )
}

export default SingleDemoBookmark