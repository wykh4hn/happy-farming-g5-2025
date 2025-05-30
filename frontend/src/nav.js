import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Main } from "./main";

const MainNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"/main"}>Shop</Link>
        </li>
      </ul>
      <button id="create-wallet">
        <a href="https://youtube.com">Create New Wallet</a>
      </button>
    </nav>
  );
};

export { MainNav };
