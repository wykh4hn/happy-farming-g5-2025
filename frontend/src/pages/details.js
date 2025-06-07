import React, { useState } from "react";
import { MainNav } from "../components/nav";
import "../styles/details.css"; 

const Detail = () => {

  const bgImage = `${process.env.PUBLIC_URL}/background.png`;
  const pageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100vw",
  };

  const headerContainerStyle = { 
    position: "absolute", 
    top: "90px", 
    left: "50%", 
    transform: "translateX(-50%)", 
    width: "80%", 
    background: "rgba(188, 222, 214, 0.9)", 
    padding: "20px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)", 
    textAlign: "center", 
  };

  const [quantity, setQuantity] = useState("1");

  // dummy product (replace with actual logic)
  const product = {
    name: "Example Product",
    contractAddress: "0x123456789abcdef",
    description: "This is a sample product description.",
    tokenId: "101", 
    price: "50",
    currency: "USD",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/happy-cow-smile-tony-rubino.jpg",
  };

  const handleBuy = (product) => { 
    alert(`You have bought ${product.name} successfully!`);
    alert(`The payment was successful. ${product.price} ${product.currency} has been deducted from your wallet.`); 
  };

  return (
    <>
      <MainNav />
      <div id="shop-container" style={pageStyle}>
        <div style={headerContainerStyle}> 
          <h1>DETAIL OF PRODUCT: {product.name.toUpperCase()}</h1> 
        </div>

        {/* Product Container */}
        <div className="product-container">
          {/* Product Image */}
          <div className="img-container">
            <img src={product.img} alt={product.name} className="product-img" />
          </div>

          {/* Product Details */}
          <div className="details-container">
            <h1>{product.name.toUpperCase()}</h1>
            <p>Contract Address: {product.contractAddress}</p>
            <p>Token ID: {product.tokenId}</p>
            <p>{product.description}</p>
            <h2>{product.price} {product.currency}</h2>

            {/* Quantity input */}
            <label>Quantity:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-style"
              required
            />

            {/* Buy button */}
            <button className="buy-button" onClick={() => handleBuy(product)}>Buy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Detail };
