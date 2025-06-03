import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

// import leafmustard from "../images/leafmustard.png";

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

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

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
    img: "/leafmustard.jpg",
    name: "LEAF MUSTARD",
    price: "2",
    description: "a leafy green vegetable",
  }),
  new Product({
    img: "/egg-fried-rice-main-preview.webp",
    name: "FRIED RICE",
    price: "48",
    description: "egg, fried, and rice",
  }),
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = ProductList.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <MainNav />

      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>
        <input
          type="text"
          id="search"
          placeholder="Search for product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div id="shop">{ProductList.map((product, _) => product.render())}</div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export { Shop };
