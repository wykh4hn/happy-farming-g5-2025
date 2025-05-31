import { MainNav } from "./nav";
import React from "react";
import { Link } from "react-router-dom";

import "../styles/styles.css";
import "../styles/shop.css";

class Product extends React.Component {
  constructor(props) {
    super();
    this.state = {
      img: props.img,
      name: props.name,
      price: props.price,
      description: props.description,

      // detail should be a link
      detail: props.detail,
    };
  }

  render() {
    const product_link = "/product/" + this.state.name;
    return (
      <div className="product">
        <img src={this.state.img} alt={this.state.name} />
        <h4>{this.state.name}</h4>
        <p>{"$" + this.state.price}</p>
        <p>{this.state.description}</p>
        <button>
          <Link to={product_link}>Details</Link>
        </button>
      </div>
    );
  }
}

const Shop = () => {
  return (
    <div>
      <MainNav />
      <Product
        img="/holstein-friesian-cow-close-up.webp"
        name="bò 1"
        price="234"
        description="bò"
        detail="Detail"
      />
      <Product
        img="https://i.imgur.com/l6kBKEN.png"
        name="job application form"
        price="41"
        description="image"
        detail="Detail"
      />
    </div>
  );
};

export { Shop };
