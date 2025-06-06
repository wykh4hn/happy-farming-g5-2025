import { Link } from "react-router-dom";
import { useState } from "react";
// import LogoWeb from "../images/logo1.png";
import "../styles/styles.css";
import "../styles/nav.css";
import { Sidebar } from "./sidebar";
const LogoWeb = "/logo1.png";


const MainNav = () => {

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <nav id="main-nav">
        <p>
          <Link to="" onClick={() => setShowSidebar(!showSidebar)}>
            <img className="logoweb" src={LogoWeb} alt="Intro tho" />
          </Link>
        </p>
        <p className="nav-hover">
          <Link to="/">Home</Link>
        </p>
        <p className="nav-hover">
          <Link to="/shop">Shop</Link>
        </p>
        <Link to="/create-wallet" id="create-wallet">
          Create New Wallet
        </Link>
      </nav>
      {/* show the sidebar tho*/}
      {showSidebar && <Sidebar />}
    </>
  );
};

export { MainNav };