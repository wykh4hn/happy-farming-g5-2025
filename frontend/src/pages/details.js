import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { MainNav } from "../components/nav";
import { WalletPopup } from "../components/walletPopup";
import axios from "axios";
import "../styles/details.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        if (res.data && res.data.content) {
          // API trả về product là object JSON string, cần parse
          const prod = typeof res.data.content === "string"
            ? JSON.parse(res.data.content)
            : res.data.content;
          setProduct(prod);
        } else {
          setError("Product not found!");
        }
      })
      .catch(() => setError("Error loading product!"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyClick = () => setShowPopup(true);

  const handleConfirm = () => {
    alert(`You have bought ${product.name} successfully!`);
    alert(
      `The payment was successful. ${product.price} ${product.currency} has been deducted from your wallet.`
    );
    setShowPopup(false);
  };

  const handleCancel = () => setShowPopup(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!product) return null;

  return (
    <>
      <MainNav />
      <div id="shop-container" style={pageStyle}>
        <div style={headerContainerStyle} id="header-container">
          <h1>DETAIL OF PRODUCT: {product.name?.toUpperCase()}</h1>
        </div>
        <div className="product-container">
          <div className="img-container">
            <img src={product.img} alt={product.name} className="product-img" />
          </div>
          <div className="details-container">
            <h1>{product.name?.toUpperCase()}</h1>
            <p>Contract Address: {product.contractAddress}</p>
            <p>Token ID: {product.tokenId}</p>
            <p>{product.description}</p>
            <h2>
              {product.price} {product.currency}
            </h2>
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
        {/* Wallet Popup appears after clicking buy */}
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
