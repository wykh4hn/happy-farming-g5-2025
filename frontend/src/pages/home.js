import { Link } from "react-router-dom";
import { MainNav } from "./nav";
<<<<<<< HEAD
import { Footer } from "./footer";
=======
import introImage from "../images/intro.png";
>>>>>>> d51343c ( please help me w the create_projuct.js)
import "../styles/styles.css";
import "../styles/home.css";


const Home = () => {
  return (
    <div>
<<<<<<< HEAD
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
=======
      <MainNav /> {/* Giữ nguyên thanh Navigation */}

      <div className="container"> {/* Bao toàn bộ nội dung */}
        <div className="main-content">
          <h1>WELCOME TO OUR WEBSITE</h1>
          <p>This is a friendly decentralized transaction web with agriculture products. Enjoy!</p>

          <Link to="/create_product" id="login">
            Create new product
          </Link>

          <Link to="/create-account" id="create-account">
            Create New Account
          </Link>
        </div>

        <div className="image-container">
          <img src={introImage} alt="Intro tho" />
        </div>
>>>>>>> d51343c ( please help me w the create_projuct.js)
      </div>
      <Footer />
    </div>
  );
};

export default Home;