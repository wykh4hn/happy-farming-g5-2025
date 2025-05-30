// import logo from "./logo.svg";
import "./styles/App.css";
import React from "react";
// import { Component } from "react";
// import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Shop } from "./pages/shop";
import { Wallet } from "./pages/wallet";
import { Login } from "./pages/login";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/create-wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      {/* <Home /> */}
    </div>
  );
};

export default App;
