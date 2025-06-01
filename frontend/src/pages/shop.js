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

      // detail should be a link
      // detail: props.detail,
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
        {/* <button> */}
        <Link to={productLink} className="detail">
          Details
        </Link>
        {/* </button> */}
      </div>
    );
  }
}

const Shop = () => {
  return (
    <div>
      <MainNav />
<<<<<<< HEAD
      <h1>Welcome to our shop!</h1>
      <div id="shop">
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
        <Product
          img="https://imgs.search.brave.com/rucX6B9VnIVomvImF_sk47HOXPsCyXW1-j2MmUyJOd0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jMS5u/ZXdlZ2dpbWFnZXMu/Y29tL3Byb2R1Y3Rp/bWFnZS9uYjMwMC83/NS05OTAtNjUzLVMw/MS5qcGc"
          name="random phone charger"
          price="23"
          description="yet another image"
          detail="Yes"
        />
      </div>
      <Footer />
=======
      <h1>COME AND SEE OUR PRODUCTS!</h1>
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
>>>>>>> d51343c ( please help me w the create_projuct.js)
    </div>
  );
};

export { Shop };
