import axios from "axios";
import React from "react";
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
  return (
    <div>
      {/* <p>{currentTab}</p> */}
      <NotebookData></NotebookData>
      <NoteLists></NoteLists>
      <button>Login with google</button>
    </div>
  );
};

export default Home;
