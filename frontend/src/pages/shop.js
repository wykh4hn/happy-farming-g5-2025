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

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

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
    name: "cow",
    price: "234",
    description: "cow",
  }),
  new Product({
    img: "https://i.imgur.com/l6kBKEN.png",
    name: "job application form",
    price: "41",
    description: "image",
  }),
  new Product({
    img: "https://imgs.search.brave.com/rucX6B9VnIVomvImF_sk47HOXPsCyXW1-j2MmUyJOd0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jMS5u/ZXdlZ2dpbWFnZXMu/Y29tL3Byb2R1Y3Rp/bWFnZS9uYjMwMC83/NS05OTAtNjUzLVMw/MS5qcGc",
    name: "random phone charger",
    price: "20948234",
    description: "charger",
  }),
];



const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = ProductList.filter((product) =>
  product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>
        <input type="text" id="search" placeholder="Search for product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <div id="shop">{ProductList.map((product, _) => product.render())}</div>   </div>
      <Footer />
    </div>
  );
};

export default Shop;
