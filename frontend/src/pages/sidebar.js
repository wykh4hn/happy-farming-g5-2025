import { Link } from "react-router-dom";

import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/shop">Shop</Link>
      </p>
      <p>
        <Link to="/create-product">Create new product</Link>
      </p>
      <p>
        <Link to="/transaction-history">Transaction history</Link>
      </p>
    </div>
  );
};

export { Sidebar };
