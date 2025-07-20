import React, { useEffect, useState } from "react";
import { MainNav } from "../components/nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import "../styles/shop.css";
import ContractData from "../contracts/Marketplace.json";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Web3 states
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3Loading, setWeb3Loading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);

  const bgImage = `${process.env.PUBLIC_URL}/background.png`;

  const homeStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
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

  const searchContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  };

  const productsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "290px",
  };

  const productStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    width: "300px",
    position: "relative",
    paddingBottom: "60px", // More space for buttons
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    maxHeight: "200px",
    display: "block",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "rgba(188, 222, 214, 0.9)",
    color: "black",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)",
  };

  const buyButtonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "100px", // Position next to Details button
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)",
  };

  // Initialize Web3 connection
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== "undefined") {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          // Initialize contract (you'll need to set this up with your contract address and ABI)
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          // const signer = provider.getSigner();
          // const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          // setContract(contract);
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
    const initWeb3 = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          // Initialize contract with proper error handling
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          // Check if ContractData has the expected structure
          console.log("Contract Data:", ContractData);

          if (ContractData && ContractData.address && ContractData.abi) {
            const contract = new ethers.Contract(
              ContractData.address,
              ContractData.abi,
              signer
            );
            setContract(contract);
            console.log("Contract initialized successfully");
          } else {
            console.error("Invalid contract data structure");
          }
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

  // Purchase function
  const buyProduct = async (productId, priceEth) => {
    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      console.log("Initiating blockchain transaction...");

      // Call the correct contract method name from your Solidity contract
      const tx = await contract.buyProduct(productId, {
        value: ethers.parseEther(priceEth.toString()),
      });

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");

      // Record in database...
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          transaction_hash: tx.hash,
          buyer_address: account,
          amount_eth: parseFloat(priceEth),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, txHash: tx.hash, purchase: result };
    } catch (error) {
      console.error("Purchase failed:", error);
      setPurchaseError(error.message);
      return { success: false, error: error.message };
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handlePurchase = async (productId, price) => {
    if (!contract || !account) {
      alert("Please connect your wallet first");
      return;
    }

    const result = await buyProduct(productId, price);

    if (result.success) {
      alert("Purchase successful!");
      // Optionally refresh products or update UI
    } else {
      alert(`Purchase failed: ${result.error}`);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <MainNav />
      <div style={homeStyle} className="home">
        {/* Header + Search & Category */}
        <div style={headerContainerStyle} id="header-container">
          <h1>SHOPPING WITH US</h1>

          {/* Web3 Status */}
          {web3Loading ? (
            <p>Connecting to wallet...</p>
          ) : account ? (
            <p>
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          ) : (
            <p>Please connect your wallet</p>
          )}

          <div className="search-container" style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search for product..."
              value={searchTerm}
              style={inputStyle}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <select
              style={selectStyle}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              <option value="All">All Categories</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Tree">Tree</option>
              <option value="Agriculture products">Agriculture products</option>
              <option value="Animal">Animal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="products-container" style={productsContainerStyle}>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", margin: 40, color: "#888" }}>
              No products found!
            </div>
          )}
          {filteredProducts.map((product) => (
            <div key={product.id} className="product" style={productStyle}>
              <img
                src={product.img}
                alt={product.name}
                className="product-img"
                style={imgStyle}
              />
              <h4>{product.name?.toUpperCase()}</h4>
              <p>
                {product.price} {product.currency}
              </p>
              <p>Quantity: {product.quantity}</p>
              <p>Asset Type: {product.assetType}</p>
              <p>Token ID: {product.token_id}</p>
              <p>
                Owner:{" "}
                {product.owner
                  ? `${product.owner.slice(0, 6)}...${product.owner.slice(-4)}`
                  : "Unknown"}
              </p>

              {/* Purchase Button */}
              <button
                style={buyButtonStyle}
                onClick={() => handlePurchase(product.id, product.price)}
                disabled={purchaseLoading || !contract || !account}
              >
                {purchaseLoading ? "Buying..." : "Buy Now"}
              </button>

              <Link
                className="details-button"
                to={`/details/${product.id}`}
                style={buttonStyle}
              >
                Details
              </Link>
            </div>
          ))}
        </div>

        {/* Error Display */}
        {purchaseError && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "rgba(255, 0, 0, 0.8)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {purchaseError}
          </div>
        )}
      </div>
    </>
  );
};

export { Shop };
