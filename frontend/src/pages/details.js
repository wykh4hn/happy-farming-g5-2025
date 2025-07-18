import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainNav } from "../components/nav";
import { WalletPopup } from "../components/walletPopup";
import { ethers } from "ethers";
import axios from "axios";
import ContractABI from "C:/Users/Admin/source/repos/group-project-may-2025-gr5/frontend/src/contracts/Marketplace.json"; // 💡 ABI imported here
import "../styles/details.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3Loading, setWeb3Loading] = useState(true);

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

  // Connect wallet and fetch balance
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);

          const provider = new ethers.BrowserProvider(window.ethereum);
          const balanceWei = await provider.getBalance(accounts[0]);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(balanceEth);
        } else {
          console.error("MetaMask not found");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
      } finally {
        setWeb3Loading(false);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); // Add this for debugging
        if (res.data && res.data.content) {
          // API trả về product là object JSON string, cần parse
          const prod = typeof res.data.content === "string"
            ? JSON.parse(res.data.content)
            : res.data.content;
          setProduct(prod);
        } else if (res.data) {
          // Handle case where product data is directly in res.data
          setProduct(res.data);
        } else {
          setError("Product not found!");
        }
      })
      .catch((error) => {
        console.error("API Error:", error); // Add this for debugging
        setError("Error loading product!");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyClick = () => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(product.contractAddress, ContractABI, signer);

      const tx = await contract.buy({
        value: ethers.parseEther(product.price),
      });

      await tx.wait();

      alert(`✅ You successfully purchased ${product.name}!`);
      alert(`💸 ${product.price} ${product.currency} has been transferred.`);

      const balanceWei = await provider.getBalance(account);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(balanceEth);

      setShowPopup(false);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert(`❌ Purchase failed: ${error.message}`);
    }
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
          {web3Loading ? (
            <p>Connecting to wallet...</p>
          ) : account ? (
            <p>
              Connected: {account.slice(0, 6)}...{account.slice(-4)} | Balance:{" "}
              {balance ? parseFloat(balance).toFixed(4) : "0"} ETH
            </p>
          ) : (
            <p>Please connect your wallet</p>
          )}
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
        {showPopup && (
          <WalletPopup
            bidAmount={parseFloat(product.price)}
            balance={balance}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
};

export { Detail };