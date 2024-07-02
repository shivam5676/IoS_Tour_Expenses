import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./store/ContextProvider";
import { ToastContainer } from "react-toastify";
// import ContextProvider from "../store/ContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      {" "}
      <App />
      <ToastContainer></ToastContainer>
    </ContextProvider>
  </BrowserRouter>
);
