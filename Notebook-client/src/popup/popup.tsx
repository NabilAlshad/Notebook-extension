import React from "react";
import ReactDOM from "react-dom";
import Home from "../Components/Home/Home";
import "./bootstrap.min.css";
import "./popup.css";
const App: React.FC<{}> = () => {
  return (
    <div>
      <Home></Home>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
