import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
