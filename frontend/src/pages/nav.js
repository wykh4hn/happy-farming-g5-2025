import { Link } from "react-router-dom";
import LogoWeb from "../images/logo1.png";
import "../styles/styles.css";
import "../styles/nav.css";

const MainNav = () => {
  return (
    <nav id="main-nav">
      <p>
        <img className="logoweb" src={LogoWeb} alt="Intro tho" />
      </p>
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
