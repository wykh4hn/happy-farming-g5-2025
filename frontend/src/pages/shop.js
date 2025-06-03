import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";


// import leafmustard from "../images/leafmustard.png";

class Product extends React.Component {
  constructor(props) {
    super();
    this.state = {
      img: props.img,
      name: props.name,
      price: props.price,
      description: props.description,
      category: props.category,
    };
  }

  render() {
    const productLink = "/product/" + this.state.name;
    return (
      <div className="product">
        <img src={this.state.img} alt={this.state.name} />
        <h4>{this.state.name}</h4>
        <h3>{"$" + this.state.price}</h3>
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
    category: "Animal",
  }),
  new Product({
    img: "https://i.imgur.com/l6kBKEN.png",
    name: "JOB APPLICATION FORM",
    price: "41",
    description: "let's have a job",
    category: "Other",
  }),
  new Product({
    img: "https://garden.org/pics/2011-11-21/saltmarsh/25621f.jpg",
    name: "LEAF MUSTARD",
    price: "2",
    description: "a leafy green vegetable",
    category: "Vegetable",
  }),
  new Product({
    img: "/egg-fried-rice-main-preview.webp",
    name: "FRIED RICE",
    price: "48",
    description: "egg, fried, and rice",
    category: "Other",
  }),
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // mới thêm
 

  const filteredProducts = ProductList.filter((product) => {
    const matchSearch =
      (product.state.name &&
        product.state.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.state.description &&
        product.state.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCategory =
    selectedCategory === "All" || product.state.category === selectedCategory;

    return matchSearch && matchCategory;
  });

 return (
  <div>
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
        
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Animal">Animal</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Tree">Tree</option>
          <option value="Agriculture products">Agriculture products</option>
          <option value="Other">Other</option>
        </select>


        <div id="shop">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="product" key={index}>
                <img src={product.state.img} alt={product.state.name} />
                <h4>{product.state.name}</h4>
                <h3>{"$" + product.state.price}</h3>
                <p>{product.state.description}</p>
                <Link to={"/product/" + product.state.name} className="detail">
                  Details
                </Link>
              </div>
          ))
        ) : (
          <h3>Uh oh it's not here. Wanna add more products with this category? <Link to="/create-product" id="create-product">
            Create new product
          </Link></h3>
        )}
        </div>
      </div>
      <Footer />
    </div>
   </div> 
  );
};

export { Shop };

