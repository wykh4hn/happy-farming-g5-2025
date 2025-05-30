import { MainNav } from "./nav";
import React from "react";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "as",
      price: 0,
      description: "the",
      detail: (
        <button>
          <a href="duckduckgo.com">detail</a>
        </button>
      ),
    };
  }

  render() {
    return (
      <div>
        <h4>{this.state.name}</h4>
        <p>{"$" + toString(this.state.price)}</p>
        <p>{this.state.description}</p>
        {this.state.detail}
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
