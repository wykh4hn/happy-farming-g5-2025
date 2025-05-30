import "../styles/styles.css";
import "../styles/create.css";
// import { MainNav } from "../nav";

import { MainNav } from "./nav";

const CreateAccount = () => {
  return (
    <div>
      <MainNav />
      <div className="main-content">
        <label htmlFor="email">Email:</label> <br />
        <input type="email" name="email" id="email" /> <br />
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" name="fullName" id="fullName" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="reEnterPassword">Re-enter Password</label>
        <input type="password" name="reEnterPassword" id="reEnterPassword" />
        <br />
      </div>
    </div>
  );
};

export { CreateAccount };
