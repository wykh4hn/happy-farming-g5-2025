
import { MainNav } from "./nav";
import "../styles/styles.css";
import "../styles/home.css";
<Link to="/">Go Home</Link>
import { Link } from "react-router-dom";

const CreateProduct = () => {
  return (
    <div>
      <h1>Create a New Product</h1>
      <p>Fill in the details to add a new product.</p>
    </div>
  );
};

export default CreateProduct;

