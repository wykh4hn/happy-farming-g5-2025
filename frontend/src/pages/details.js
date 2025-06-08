import React, { useState } from "react";
import { MainNav } from "../components/nav";
import { WalletPopup } from "../components/walletPopup";
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
  const [showPopup, setShowPopup] = useState(false);

  const product = {
    name: "Example Product",
    contractAddress: "0x123456789abcdef",
    description: "This is a sample product description.",
    tokenId: "101",
    price: "50",
    currency: "USD",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/happy-cow-smile-tony-rubino.jpg",
  };

  const handleBuyClick = () => {
    setShowPopup(true); 
  };

  const handleConfirm = () => {
    alert(`You have bought ${product.name} successfully!`);
    alert(`The payment was successful. ${product.price} ${product.currency} has been deducted from your wallet.`);
    setShowPopup(false); 
  };

  const handleCancel = () => {
    console.log("Purchase canceled.");
    setShowPopup(false); 
  };

  return (
    <>
      <MainNav />
      <div id="shop-container" style={pageStyle}>
        <div style={headerContainerStyle} id="header-container">
          <h1>DETAIL OF PRODUCT: {product.name.toUpperCase()}</h1>
        </div>

        <div className="product-container">
          <div className="img-container">
            <img src={product.img} alt={product.name} className="product-img" />
          </div>

          <div className="details-container">
            <h1>{product.name.toUpperCase()}</h1>
            <p>Contract Address: {product.contractAddress}</p>
            <p>Token ID: {product.tokenId}</p>
            <p>{product.description}</p>
            <h2>{product.price} {product.currency}</h2>

            <label>Quantity:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-style"
              required
            />

            <button className="buy-button" onClick={handleBuyClick}>
              Buy
            </button>
          </div>
        </div>

        {/* eallet Popup appears after clicking buy */}
        {showPopup && (
          <WalletPopup
            bidAmount={parseFloat(product.price)}
            balance={30033}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
};

export { Detail };
