import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./intro";
import { Shop } from "./shop";
import { Wallet } from "./wallet";

const App = () => {
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/create-wallet" element={<Wallet />} />
    </Routes>
  </Router>;
  return <Home />;
};

export default App;
