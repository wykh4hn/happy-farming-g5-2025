import { MainNav } from "./nav";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

import "../styles/styles.css";
import "../styles/shop.css";
import { Footer } from "./footer";

class Product extends React.Component {
  constructor(props) {
    super();
    this.state = {
      img: props.img,
      name: props.name,
      price: props.price,
      description: props.description,
    };
  }

  render() {
    const productLink = "/product/" + this.state.name;
    return (
      <div className="product">
        <img src={this.state.img} alt={this.state.name} />
        <h4>{this.state.name}</h4>
        <p>{"$" + this.state.price}</p>
        <p>{this.state.description}</p>
        <Link to={productLink} className="detail">
          Details
        </Link>
      </div>
    );
  }
}
const Sidebar = () => {
  return (
    <div id="sidebar">
      <p>
        <Link to="#">Menu Item</Link>
      </p>
      <p>
        <Link to="#">Menu Item</Link>
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


const ProductList = [
  new Product({
    img: "/holstein-friesian-cow-close-up.webp",
    name: "COW (JENNIFER)",
    price: "234",
    description: "she is a cow",
  }),
  new Product({
    img: "https://i.imgur.com/l6kBKEN.png",
    name: "JOB APPLICATION FORM",
    price: "41",
    description: "let's have a job",
  }),
  new Product({
    img: "https://sgeviet.vn/wp-content/uploads/2022/02/cai-xoan-Curly-Kale.jpg",
    name: "LEAF MUSTARD",
    price: "2",
    description: "a leafy green vegetable",
  }),
  new Product({
    img: "https://www.cookerru.com/wp-content/uploads/2022/07/egg-fried-rice-main-preview.jpg",
    name: "FRIED RICE",
    price: "48",
    description: "egg, fried, and rice",
  }),
];



const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredProducts = ProductList.filter((product) =>
    (product.state.name && product.state.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.state.description && product.state.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>

        <input
          type="text"
          id="search"
          placeholder="Search for product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div id="shop">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <React.Fragment key={index}>{product.render()}</React.Fragment>
            ))
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Shop };





