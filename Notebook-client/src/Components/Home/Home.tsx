import axios from "axios";
import React, {useState} from "react";
import NotebookData from "../NotebookData/NotebookData";
import NoteLists from "../NoteLists/NoteLists";

const Home = () => {
  let currentTab = chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabs) {
      console.log(tabs[0].url);
      // var currentTab = tabs[0].url;
    }
  );

  const googleLoginButton = () => {
    axios.get("");
  };
  const [isModified, setIsModified] = useState<boolean>(false)
  return (
    <div>
      {/* <p>{currentTab}</p> */}
      <NotebookData isModified = {isModified} setIsModified = {setIsModified}></NotebookData>
      <NoteLists isModified = {isModified}></NoteLists>
      {/* <button>Login with</button> */}
    </div>
  );
};

export default Home;
