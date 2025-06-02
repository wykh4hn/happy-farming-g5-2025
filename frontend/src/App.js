import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Shop } from "./pages/shop";
import { Wallet } from "./pages/wallet";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/create_account";
import { CreateProduct } from "./pages/create_product";

import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/create-wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
      {/* <Home /> */}
    </div>
  );
};

export default App;
