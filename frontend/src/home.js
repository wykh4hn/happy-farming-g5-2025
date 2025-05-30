// import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainNav } from "./nav";
import "./home.css";

const Home = () => {
  return (
    <div>
      <MainNav />
      <div id="home-content">
        <h1>Welcome to our website!</h1>
        <p>Please login</p>
        <button id="login">
          <Link to="/login">Login</Link>
        </button>
        <button id="create-account">
          <Link to="/create=account">Create New Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
