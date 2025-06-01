import { MainNav } from "./nav";
import { Link } from "react-router-dom";

import "../styles/styles.css";
import "../styles/login.css";
import { Footer } from "./footer";

const Login = () => {
  return (
    <div>
      <MainNav />
      <div className="main-content">
        <div id="login-form">
          <form action="post">
            <label htmlFor="username">Username: </label>
            <br />
            <input type="text" name="username" />
            <br />
            <label htmlFor="password">Password: </label>
            <br />
            <input type="text" name="password" />
            <br />
            <input type="submit" value="Register!" />
            <br />
          </form>
          <p>Don't have an account?</p>
          <button>
            <Link to="/create-account">Create Account</Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Login };
