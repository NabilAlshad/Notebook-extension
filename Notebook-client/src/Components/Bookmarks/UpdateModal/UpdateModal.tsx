import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Button, Form, Modal } from 'react-bootstrap';


const UpdateModal = ({show, handleClose, bookmark }) => {
    const [bookmarkData, setBookmarkData] = useState ({
        title: "",
        description: "",
        link: "",
        category: ""
    })
    console.log({bookmarkData})
    useEffect (() => {
        (async () => {
            const {data} =  await axios.get (`http://localhost:4300/form/bookmark/${bookmark._id}`)
            console.log({data})
            // if (data) {
            //     setBookmarkData ({
            //         title: getBookmark.title,
            //         description: getBookmark.description,
            //         link: getBookmark.link,
            //         category: getBookmark.category
            //     })
            // }
            console.log(data)
        })()
        
    }, [])
   return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Title: {bookmark.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {/* bookmark title */}
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter email"
                    value = {bookmarkData.title}
                    onChange = {(e) => setBookmarkData ({...bookmarkData, title: e.target.value})}
                    />
                </Form.Group>

                 {/* bookmark description */}
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter email"
                    onChange = {(e) => setBookmarkData ({...bookmarkData, description: e.target.value})}
                    value = {bookmarkData.description}/>
                </Form.Group>

                 {/* bookmark link */}
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Link</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter email" 
                    value = {bookmarkData.link}
                    onChange = {(e) => setBookmarkData ({...bookmarkData, link: e.target.value})}
                    />
                </Form.Group>

                 {/* bookmark category */}
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter email" 
                    onChange = {(e) => setBookmarkData ({...bookmarkData, category: e.target.value})}
                    value = {bookmarkData.category}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal