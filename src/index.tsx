import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Pages
import Home from "./pages";
import LandingPage from "./pages/LandingPage";

// Styles
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concept" element={<LandingPage />} />
        {/*<Route path="*" element={<ErrorPage />} />*/}
      </Routes>
    </Router>
  </React.StrictMode>
);
