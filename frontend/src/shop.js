import { MainNav } from "./nav";
import React from "react";

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
    return (
      <div className="product">
        <h4>{this.state.name}</h4>
        <p>{"$" + toString(this.state.price)}</p>
        <p>{this.state.description}</p>
        <button>{this.state.detail}</button>
      </div>
    );
  }
}

const Shop = () => {
  return (
    <div>
      <MainNav />
      <Product name="box" price={5} description="a box" />
    </div>
  );
};

export { Shop };
