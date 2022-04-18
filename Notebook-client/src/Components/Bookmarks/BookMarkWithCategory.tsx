import React from 'react'
import { Accordion, Table } from 'react-bootstrap'
import  "./BookMarkWithCategory.css"
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
    },
    setIsModified,
    isModified
}: {
    bookmarks: {
        category: string,
        bookmarksItem:BookmarksItem
    },
    setIsModified: Function,
    isModified: boolean
}) => {
  return (
    <div>
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header className = {`title`} >Category Name: {category}</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Show Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            bookmarksItem.map((bookmark: Books, ind: number) => {
                                return (
                                    <SingleDemoBookmark key = {ind} bookmark={bookmark} setIsModified = {setIsModified} isModified = {isModified}/>
                                    )
                                }) 
                            }
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default BookMarkWithCategory