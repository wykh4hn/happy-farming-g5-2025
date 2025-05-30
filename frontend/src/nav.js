import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./nav.css";

const MainNav = () => {
  return (
    <nav id="main-nav">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/shop">Shop</Link>
      </p>

      <button id="create-wallet">
        <Link to="/wallet">Create New Wallet</Link>
      </button>
    </nav>
  );
};

export { MainNav };
