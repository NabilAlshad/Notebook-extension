import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./UpdateModal.css";
const UpdateModal = ({ show, handleClose, bookmark }) => {
  // const { title, category, description } = bookmark;
  const [bookmarkData, setBookmarkData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4300/form/update/${bookmark._id}`, bookmarkData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    (async () => {
      // const { data } = await axios.get(
      //   `http://localhost:4300/form/bookmark/${bookmark._id}`
      // );
    })();
  }, []);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Title: {bookmark.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4>Description:{bookmark.description}</h4>

        <h4>category:{bookmark.category}</h4>
        <Form>
          {/* bookmark title */}
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={bookmarkData.title}
              onChange={(e) =>
                setBookmarkData({ ...bookmarkData, title: e.target.value })
              }
            />
          </Form.Group>

          {/* bookmark description */}
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your description"
              as="textarea"
              rows={3}
              onChange={(e) =>
                setBookmarkData({
                  ...bookmarkData,
                  description: e.target.value,
                })
              }
              value={bookmarkData.description}
            />
          </Form.Group>

          {/* bookmark link */}
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={bookmark.link}
              onChange={(e) =>
                setBookmarkData({ ...bookmarkData, link: e.target.value })
              }
            />
          </Form.Group> */}

          {/* bookmark category */}
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter updated Category"
              onChange={(e) =>
                setBookmarkData({ ...bookmarkData, category: e.target.value })
              }
              value={bookmarkData.category}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
