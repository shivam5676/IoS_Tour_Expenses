import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./store/ContextProvider";
// import ContextProvider from "../store/ContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <ContextProvider> <App /></ContextProvider>
  </BrowserRouter>
);
