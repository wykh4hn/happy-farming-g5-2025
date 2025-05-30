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
        <p>Please login</p>
        <button id="login">
          <Link to="/login">Login</Link>
        </button>
        <button id="create-account">
          <Link to="/create-account">Create New Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
