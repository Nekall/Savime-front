import React from "react";
import ReactDOM from "react-dom/client";

// Pages
import Home from "./pages";

// Styles
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
