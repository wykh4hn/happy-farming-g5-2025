import { Link } from "react-router-dom";
import { MainNav } from "./nav";
import "../styles/styles.css";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <MainNav />
      <div className="main-content">
        <h1>Welcome to our website!</h1>
        <p>
          This is a friendly decentralized transaction website with algrculture
          products. Enjoy!
        </p>

        <Link to="/shop" id="shop">
          See the shop
        </Link>

        <Link to="/login" id="login">
          Login
        </Link>

        <Link to="/create-account" id="create-account">
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
