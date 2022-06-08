import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import Provider from "./Store/Provider.js";

ReactDOM.render(
  // <React.StrictMode>
  <Provider>
    <Router>
      <App />
    </Router>
    ,
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
