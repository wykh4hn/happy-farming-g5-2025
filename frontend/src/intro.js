// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { MainNav } from "./nav";
import "./styles.css";

const Home = () => {
  return (
    <div>
      <MainNav />
      <h1>Welcome to our website!</h1>
      <p>Please login</p>
      <button id="login">Log in</button>
      <button id="create-account">Create new Account</button>
    </div>
  );
};

export default Home;
