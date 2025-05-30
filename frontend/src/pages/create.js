import "../styles/styles.css";
import "../styles/create.css";
import { MainNav } from "../nav";

const Create = () => {
  return (
    <div className="main-content">
      <MainNav />
      <label htmlFor="email"></label> <br />
      <input type="email" name="email" id="email" /> <br />
      <label htmlFor="fullName"></label>
      <input type="text" name="fullName" id="fullName" />
    </div>
  );
};

export { Create };
