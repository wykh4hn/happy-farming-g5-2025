import React, { useEffect, useState } from "react";
import { MainNav } from "../components/nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import "../styles/shop.css";
let ContractData;
try {
  ContractData = require("../contracts/Marketplace.json");
} catch (e) {
  console.error("Failed to load contract data:", e);
  ContractData = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: [],
  };
}

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
        if (!ContractData) {
          console.error("Contract data is undefined!");
          setError("Contract data missing");
          return;
        }

        const contractABI = ContractData.abi;

        console.log("Contract Data type:", typeof ContractData);
        console.log("Contract Address:", ContractData?.address);
        console.log("ABI type:", typeof ContractData?.abi);
        console.log("ABI isArray:", Array.isArray(contractABI));
        console.log("ABI length:", ContractData?.abi?.length);

        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          if (ContractData?.address && Array.isArray(ContractData?.abi)) {
            const contract = new ethers.Contract(
              ContractData.address,
              contractABI,
              signer
            );
            setContract(contract);
            console.log("Contract initialized successfully");
          } else {
            console.error("Invalid contract data:", {
              hasAddress: !!ContractData?.address,
              abiIsArray: Array.isArray(ContractData?.abi),
            });
            setError("Contract configuration error");
          }
        } else {
          setError("MetaMask not found");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
        setError(`Web3 error: ${error.message}`);
      } finally {
        setWeb3Loading(false);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching products from API...");
        const response = await axios.get("/api/products");

        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.content &&
          Array.isArray(response.data.content)
        ) {
          setProducts(response.data.content);
          console.log(
            `Successfully loaded ${response.data.content.length} products`
          );
        } else {
          console.warn("Invalid API response structure:", response.data);
          setProducts([]);
          setError("Invalid product data received");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(
          "Failed to load products. Please check if the backend is running."
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // <-- This line was missing!
  }, []);

  // Purchase function
  const buyProduct = async (databaseProductId, priceEth) => {
    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      console.log("Starting purchase process...");

      if (!contract) {
        throw new Error("Contract not initialized");
      }

      if (!ContractData || !ContractData.abi) {
        throw new Error("Contract ABI not available");
      }

      console.log("Getting product from database:", databaseProductId);
      const productResponse = await axios.get(
        `/api/products/${databaseProductId}`
      );
      const product = productResponse.data.content;

      console.log("Product data:", product);
      const blockchainProductId = product.token_id;

      if (!blockchainProductId) {
        throw new Error("Product not found on blockchain");
      }

      console.log("Buying product on blockchain:", blockchainProductId);
      console.log("Price in ETH:", priceEth);

      // Make sure blockchainProductId is a number
      const productId = parseInt(blockchainProductId) || 1;

      console.log("Calling contract.buyProduct with ID:", productId);
      const tx = await contract.buyProduct(productId, {
        value: ethers.parseEther(priceEth.toString()),
      });

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");

      // Record in database
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: databaseProductId,
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

      // Handle specific errors
      if (error.code === "CALL_EXCEPTION") {
        setPurchaseError(
          "Contract call failed - product may not exist on blockchain"
        );
      } else if (error.message.includes("ABI")) {
        setPurchaseError("Contract ABI error - check console for details");
      } else {
        setPurchaseError(error.message);
      }

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
