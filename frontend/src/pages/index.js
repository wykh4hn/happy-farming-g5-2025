// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Intro = () => {
  return (
    <div className="App">
      <nav>
        <a href="">Home</a>
        <a href="">other</a>
        <button id="create-wallet">
          <a href="">Create New Wallet</a>
        </button>
      </nav>
      <h1>Welcome to our website!</h1>
      <p>Please login</p>
      <button id="login">Log in</button>
      <button id="create-account">Create new Account</button>
    </div>
  );
};

export default Intro;
