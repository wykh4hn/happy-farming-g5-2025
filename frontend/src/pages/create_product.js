import "../styles/styles.css";

import { MainNav } from "./nav";
import { Footer } from "./footer";

const CreateProduct = () => {
  return (
    <div>
      <MainNav />
      <div class="main-content">
        <form action="get">
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" name="name" id="name" />
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <input type="number" name="price" id="price" />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <input type="submit" value="Add product!" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export { CreateProduct };
