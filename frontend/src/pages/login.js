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
            {/* <br /> */}
            <input type="text" name="username" />
            {/* <br /> */}
            <label htmlFor="password">Password: </label>
            {/* <br /> */}
            <input type="password" name="password" />
            {/* <br /> */}
            <input type="submit" value="Register!" />
            {/* <br /> */}
          </form>
          <p>Don't have an account?</p>

          <Link to="/create-account" id="create-account-link">
            Create Account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Login };
