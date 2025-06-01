import { Link } from "react-router-dom";

import "../styles/styles.css";
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

      <Link to="/create-wallet" id="create-wallet">
        Create New Wallet
      </Link>
    </nav>
  );
};

export { MainNav };
