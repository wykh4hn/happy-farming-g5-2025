import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./main";

export default function MainNav() {
  return (
    <nav>
      <Router>
        <Routes>
          <Route path="./main" element={<Main />} />
        </Routes>
      </Router>
      <button id="create-wallet">
        <a href="https://youtube.com">Create New Wallet</a>
      </button>
    </nav>
  );
}

export { MainNav };
