import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./index.css";
interface InoteData {
  title: String;
  description: String;
  link: String;
  category: String;
  newCategory?: String;
}
// interface iavailableCategory{
//   category: [string];
// }
const NotebookData = () => {
  //states declarations
  const [officialCategory, setofficialCategory] = useState<string[]>([""]);
  const [isChange, setisChange] = useState<Boolean>(false);
  const [noteData, setNoteData] = useState<InoteData>({} as InoteData);
  const [urlLink, seturlLink] = useState<String>("");
  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLTextAreaElement>();
  const categoryRef = useRef<HTMLSelectElement>();
  const newCategoryRef = useRef<HTMLInputElement>();
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0].url);
    seturlLink(tabs[0].url);
  });

  //loading official category
  useEffect(() => {
    axios
      .get("http://localhost:4300/official/get")
      .then((response) => {
        const data = response.data.data.availableCategory;
        // console.log({ response: response.data.data.availableCategory}); //log to the console of official category
        setofficialCategory(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //post category to the browser
  const handleSubmit = async (): Promise<void> => {
    setNoteData({
      title: (titleRef.current as HTMLInputElement).value,
      description: (descriptionRef.current as HTMLTextAreaElement).value,
      link: urlLink,
      category: (categoryRef.current as HTMLSelectElement).value,
      newCategory: (newCategoryRef.current as HTMLInputElement).value,
    });
    setisChange(!isChange);
  };
  useEffect(() => {
    axios
      .post("http://localhost:4300/form/post", noteData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [isChange]);
  return (
    <Container fluid className="formData">
      <Row>
        <Col sm={6} className="form-group">
          <label className="text-primary">Current Tab Link</label>
          <input
            type="text"
            className="form-control"
            value={urlLink.toString()}
          />

          <input
            className="form-control"
            placeholder="enter a title of choosen link "
            type="text"
            ref={titleRef}
          ></input>
          <label className="text-primary">Select Category</label>

          <select
            placeholder="select a category"
            ref={categoryRef}
            className="form-control"
            name="category"
            id=""
          >
            {officialCategory.map((category) => {
              // const splitCategory: string[] = category.split("");
              // const capitalize: string[] = splitCategory.map(
              //   (category: string, ind: number) => {
              //     console.log(`object`);
              //     if (ind == 0) {
              //       category.toUpperCase();
              //     }
              //     return category;
              //   }
              // );
              // let mainCategory: string = "";
              // capitalize.forEach((categoryString: string): void => {
              //   mainCategory += categoryString;
              // });
              // console.log({ mainCategory });
              return <option value={category}>{category.toUpperCase()}</option>;
            })}
          </select>
          <label className="text-primary">Enter a category</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter your own category"
            ref={newCategoryRef}
          />
        </Col>
        <Col sm={6}>
          <label className="text-primary" htmlFor="">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="write some note ...."
            ref={descriptionRef}
            name=""
            id=""
            cols={20}
            rows={9}
          ></textarea>
        </Col>
        <button onClick={handleSubmit} className="submit shadow-lg">
          submit
        </button>
      </Row>
    </Container>
  );
};

export default NotebookData;
