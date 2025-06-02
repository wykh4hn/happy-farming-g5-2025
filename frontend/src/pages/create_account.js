import "../styles/styles.css";
import "../styles/create.css";

import { MainNav } from "./nav";
import { Footer } from "./footer";

const CreateAccount = () => {
  return (
    <div>
      <MainNav />
      <div className="main-content">
        <form action="get">
          <label htmlFor="email">Email:</label> <br />
          <input type="email" name="email" id="email" /> <br />
          <label htmlFor="fullName">Full Name:</label>
          <br />
          <input type="text" name="fullName" id="fullName" />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" name="password" id="password" />
          <br />
          <label htmlFor="reEnterPassword">Re-enter Password</label>
          <br />
          <input type="password" name="reEnterPassword" id="reEnterPassword" />
          <br />
          <br />
          <input
            type="submit"
            value="Create New Account!"
            id="create-account-button"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export { CreateAccount };
