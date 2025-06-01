import { Link } from "react-router-dom";
import { MainNav } from "./nav";
import { Footer } from "./footer"; 
import introImage from "../images/intro.png";
import "../styles/styles.css";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <MainNav /> 

      <div className="container"> 
        <div className="main-content">
          <h1>WELCOME TO OUR WEBSITE</h1>
          <p>This is a friendly decentralized transaction web with agriculture products. Enjoy!</p>

          <Link to="/shop" id="shop-link">
            See the shop
          </Link>

          <Link to="#" id="login">
            Create new product
          </Link>

          <Link to="/create-account" id="create-account">
            Create New Account
          </Link>
        </div>

        <div className="image-container">
          <img src={introImage} alt="Intro tho" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
