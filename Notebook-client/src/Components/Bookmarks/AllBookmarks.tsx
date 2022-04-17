import React, {useEffect, useState} from 'react'
import axios from "axios"
import SingleDemoBookmark from './SingleDemoBookmark'
import BookMarkWithCategory from './BookMarkWithCategory'
type Book = {
    _id: object | string,
    title: string,
    description:string,
    link: string,
    category: string
}
type BookmarkItem = {
    category:string,
    bookmarksItem: [
      {
        _id: object | string,
        title: string,
        description:string,
        link: string,
        category: string
      }
    ]
  }
type Bookmark = [
  {
    category:string,
    bookmarksItem: [
      {
        _id: object | string,
        title: string,
        description:string,
        link: string,
        category: string
      }
    ]
  }
]

const AllBookmarks: ({
  isModified:boolean
}) => JSX.Element = (isModified) => {
  const [bookMarkData, setBookMarkData] = useState <Bookmark | []> ([])
  useEffect (():void => {
    (async (): Promise<void> => {
        const {
          data: {
            message,
            data:responseData
          }
        }: {
          data: {
            message: string,
            data: null | Bookmark
          }
        }= await axios.get ("http://localhost:4300/form/bookmarks")
        if (responseData) {
          setBookMarkData (responseData)
        }
    })()
  }, [isModified])
  return (
    <div>
        {
          bookMarkData.length != 0 
          ?
          <div>
              {
                bookMarkData.map ((bookmark:BookmarkItem, ind:number) => {
                  return (
                    <>
                      <BookMarkWithCategory key = {ind} bookmarks = {bookmark} />
                    </>
                  )
                })
              }
          </div>
          :
          <div>
            <h5>No bookmark found</h5>
          </div>
        }
    </div>
  )
}

export default React.memo (AllBookmarks)
