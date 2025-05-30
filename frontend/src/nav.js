import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles.css";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <button id="wallet">
        <Link to="/wallet">Create New Wallet</Link>
      </button>
    </nav>
  );
};

export { MainNav };
