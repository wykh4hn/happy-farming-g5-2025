import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";

import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

const TransactionHistory = () => {
  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="transaction-history" className="main-content">
        <p>Page in progress</p>
      </div>
      <Footer />
    </div>
  );
};

export { TransactionHistory };
