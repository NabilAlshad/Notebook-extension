import React from 'react'
import { Accordion } from 'react-bootstrap'
import SingleDemoBookmark from './SingleDemoBookmark'
type BookmarksItem = [{
    _id: object | string,
    title: string,
    description:string,
    link: string,
    category: string
}]
type Books = {
    _id: object | string,
    title: string,
    description:string,
    link: string,
    category: string
}
const BookMarkWithCategory = ({
    bookmarks: {
        category,
        bookmarksItem
    }
}: {
    bookmarks: {
        category: string,
        bookmarksItem:BookmarksItem
    }
}) => {
    console.log(`I am rendered`)
  return (
    <div>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Category Name: {category}</Accordion.Header>
                <Accordion.Body>
                    {
                        bookmarksItem.map((bookmark: Books, ind: number) => {
                            return (
                                <Accordion.Body>
                                    <SingleDemoBookmark key = {ind} bookmark={bookmark}/>
                                </Accordion.Body>
                            )
                        }) 
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default BookMarkWithCategory