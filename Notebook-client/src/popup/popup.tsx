import React from "react";
import ReactDOM from "react-dom";
import Home from "../Components/Home/Home";
import "./bootstrap.min.css";
import "./popup.css";
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faFilePen,
  faBan
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faFilePen,
  faBan
)
// library.add(faCoffee)
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
