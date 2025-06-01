import { Link } from "react-router-dom";
import { MainNav } from "./nav";
import { Footer } from "./footer";
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

        <Link to="/shop" id="shop-link">
          See the shop
        </Link>

        <Link to="/login" id="login-link">
          Login
        </Link>

        <Link to="/create-account" id="create-account-link">
          Create New Account
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
