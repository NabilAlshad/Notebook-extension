import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import "./UpdateModal.css";
const UpdateModal = ({ show, handleClose, bookmark, isClick,setIsModified, isModified  }) => {
  const [isSubmitButtonCLick, setIsSubmitButtonClick] = useState <boolean>(false)
  const [isSuccessfulUpdated, setSuccessfulUpdated] = useState  <boolean>(false)
  const [isUpdateProcessComplete, setIsUpdateProcessComplete] = useState  <boolean> (false)
  const [bookmarkData, setBookmarkData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const updateHandler = async (e): Promise <void> => {
    e.preventDefault();
    setIsSubmitButtonClick (true);
  }

  //info update part
  useEffect (() => {
    if (isSubmitButtonCLick) {
      (async ():Promise <void> => {
          const {data} = await axios.put(`http://localhost:4300/form/update/${bookmark._id}`, bookmarkData)
          if (data.status == 202) {
            setIsModified (!isModified)
            setSuccessfulUpdated (true);
          }
          setIsUpdateProcessComplete (true);
        })()
    }
  }, [isSubmitButtonCLick])

  //when update process complete it will hide the modal
  useEffect (() => {
    if (isUpdateProcessComplete) {
      handleClose();
    }
  }, [isUpdateProcessComplete])

  //store the existed bookmark data into local state so that it will show as form default value
  useEffect(() => {
    setIsSubmitButtonClick (false) 
    setSuccessfulUpdated (false)
    setBookmarkData (
      {
        title: bookmark.title,
        description: bookmark.description,
        category: bookmark.category
      }
    )
  }, [isClick]);

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
        <Button variant="primary" onClick={updateHandler} style = {{width: "35%", overflow: "hidden"}}>
          {
            isSubmitButtonCLick  //when user click the update button that time a spinner will show and the text will be remove
            ?
            <>
              {
                isUpdateProcessComplete  //check that is update process is running or complete if not then it will show a spinner
                ?
                <>
                  {
                    isSuccessfulUpdated //if successfully updated then it will show a right sign otherwise it will show cross sign
                    ?
                     <FontAwesomeIcon icon= {["fas", "check-double"]} />
                    :
                     <FontAwesomeIcon icon= {["fas", "xmark"]} />
                  }
                </>
                :
                <Spinner animation="grow" />
              }
            </>
            :
            <>
              Save Changes
            </>
          }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
