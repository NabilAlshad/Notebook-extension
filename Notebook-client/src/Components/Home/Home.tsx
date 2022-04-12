import React from "react";
import NotebookData from "../NotebookData/NotebookData";

const Home = () => {
  let currentTab = chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabs) {
      console.log(tabs[0].url);
      // var currentTab = tabs[0].url;
    }
  );
  return (
    <div>
      {/* <p>{currentTab}</p> */}
      <NotebookData></NotebookData>
    </div>
  );
};

export default Home;
