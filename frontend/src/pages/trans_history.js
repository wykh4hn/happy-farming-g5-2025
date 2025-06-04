import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

const TransactionHistory = () => {
  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="transaction-history">
        <p>Page in progress</p>
      </div>
      <Footer />
    </div>
  );
};
