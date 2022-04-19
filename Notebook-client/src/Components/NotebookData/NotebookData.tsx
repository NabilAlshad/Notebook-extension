import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./index.css";
interface InoteData {
  title: String;
  description: String;
  link: String;
  category: String;
  newCategory?: String;
}
const NotebookData = ({ setIsModified, isModified }) => {
  const [officialCategory, setofficialCategory] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>(""); //to show it into screen as a message
  const [isChange, setisChange] = useState<Boolean>(false);

  const [urlLink, seturlLink] = useState<string>("");
  const resetState = {
    title: "",
    description: "",
    link: "",
    category: "",
    newCategory: "",
  };
  const [noteData, setNoteData] = useState(resetState);

  useEffect(() => {
    axios
      .get("http://localhost:4300/official/get")
      .then((response) => {
        const data = response.data.data.availableCategory;

        setofficialCategory(data);
      })
      .catch((error) => console.error(error));
  }, [isChange]);
  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:4300/form/post",
        noteData
      );
      if (response.data.status === 201) {
        setNotification("Data saved successfully");
        console.log(notification);
      }
      if (response.data.status === 406) {
        setNotification(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setNotification(error.message);
    }

    setIsModified(!isModified);
    setNoteData({
      ...resetState,
      link: urlLink.toString(),
    });
    setisChange(!isChange);
  };
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4300/form/post", noteData)
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   setIsModified(!isModified);
  //   setNoteData(resetState);
  //   // setisChange(!isChange);
  // }, [isChange]);
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      seturlLink(tabs[0].url);
      setNoteData({ ...noteData, link: tabs[0].url });
    });
  }, [isChange]);
  return (
    <Container fluid className="formData">
      <Row>
        <Col sm={6} className="form-group">
          <label className="label-field">Current Tab Link</label>
          <input
            type="text"
            className="form-control"
            value={noteData.link}
            onChange={(e) => setNoteData({ ...noteData, link: e.target.value })}
          />

          <input
            className="form-control"
            placeholder="enter a title of choosen link "
            type="text"
            value={noteData.title}
            onChange={(e) =>
              setNoteData({ ...noteData, title: e.target.value })
            }
          ></input>
          <label className="label-field">Select Category</label>

          <select
            placeholder="select a category"
            value={noteData.category}
            onChange={(e) =>
              setNoteData({ ...noteData, category: e.target.value })
            }
            className="form-control"
            name="category"
            id=""
          >
            {officialCategory.map((category) => {
              return <option value={category}>{category.toUpperCase()}</option>;
            })}
          </select>
          <label className="label-field">Enter a category</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter your own category"
            value={noteData.newCategory}
            onChange={(e) =>
              setNoteData({ ...noteData, newCategory: e.target.value })
            }
          />
        </Col>
        <Col sm={6}>
          <label className="label-field" htmlFor="">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="write some note ...."
            value={noteData.description}
            onChange={(e) =>
              setNoteData({ ...noteData, description: e.target.value })
            }
            name=""
            id=""
            cols={20}
            rows={9}
          ></textarea>
        </Col>
        <button onClick={handleSubmit} className="submit shadow-lg">
          submit
        </button>

        {/* message show part */}
        <p>{notification}</p>
      </Row>
    </Container>
  );
};

export default React.memo(NotebookData);
