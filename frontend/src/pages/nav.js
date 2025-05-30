import { Link } from "react-router-dom";

import "../styles/index.css";
import "../styles/nav.css";

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
        <Link to="/create-wallet">Create New Wallet</Link>
      </button>
    </nav>
  );
};

export { MainNav };
