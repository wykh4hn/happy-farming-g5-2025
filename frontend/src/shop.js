import "./shop.css";

import { MainNav } from "./nav";
import React from "react";
import { Link } from "react-router-dom";

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
        img="logo192.png"
        name="bò 1"
        price="234"
        description="bò"
        detail=""
      />
    </div>
  );
};

export { Shop };
