import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./services/Context.jsx";
import ToastContainer from "./utils/Toast.jsx";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Context>
      <ToastContainer />
      <App />
    </Context>
  </BrowserRouter>
);
