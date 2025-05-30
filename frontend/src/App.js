import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./pages";

const App = () => {
  <Router>
    <Routes>
      <Route path="/main" element={<Main />} />
    </Routes>
  </Router>;
  return <Intro />;
};

export default App;
