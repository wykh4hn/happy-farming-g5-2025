import { MainNav } from "./nav";
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

const Shop = () => {
  return (
    <div>
      <MainNav />
      <h1>WELCOME TO OUR SHOP!</h1>

      <div id="shop">
        <Product
          img="/holstein-friesian-cow-close-up.webp"
          name="bò 1"
          price="234"
          description="bò"
        />
        <Product
          img="https://i.imgur.com/l6kBKEN.png"
          name="job application form"
          price="41"
          description="image"
        />
        <Product
          img="https://imgs.search.brave.com/rucX6B9VnIVomvImF_sk47HOXPsCyXW1-j2MmUyJOd0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jMS5u/ZXdlZ2dpbWFnZXMu/Y29tL3Byb2R1Y3Rp/bWFnZS9uYjMwMC83/NS05OTAtNjUzLVMw/MS5qcGc"
          name="random phone charger"
          price="23"
          description="yet another image"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
