import "../styles/create_product.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "../components/nav";

import axios from "axios";

const CreateProduct = () => {
  const bgImage = `${process.env.PUBLIC_URL}/background1.png`;

  // Page background that covers the entire window
  const pageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "30px",
  };

  // Container style (replacing #create-product-page)
  const containerStyle = {
    maxWidth: "800px",
    width: "90%",
    padding: "50px 20px",
    boxSizing: "border-box",
    animation: "fadeIn 0.3s ease-in-out",
  };

  const headingStyle = {
    fontFamily: '"Abril Fatface", sans-serif',
    fontSize: "2.5em",
    textAlign: "center",
    color: "#044b4d",
    backgroundColor: "#f8f4eb",
    padding: "15px 40px",
    borderRadius: "50px",
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  // Form container style
  const formStyle = {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    marginTop: "170px",
    backgroundColor: "#f8f4eb8e",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "left",
  };

  const commonInputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    margin: "5px",
  };

  // Submit button style (for #create-product)
  const buttonStyle = {
    color: "black",
    backgroundColor: "#f0f2ab",
    borderRadius: "10px",
    border: "olive",
    width: "100%",
    padding: "10px",
    margin: "5px",
  };

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Animal");
  const [quantity, setQuantity] = useState("1");

  const [address, setAddress] = useState("");
  const [tokenID, setTokenID] = useState("");

  const navigate = useNavigate();

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImage(reader.result);
    }
  };

  // get address

  const getOwner = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setAddress("");
        return null;
      }
    } else {
      alert("Please install MetaMask!");
      setAddress("");
      return null;
    }
  };
  // randomly create id
  const generateTokenID = (length) => {
    let result = "";
    let hexChars = "0123456789abcdef";
    for (let i = 0; i < length; i++) {
      result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get the wallet address first
    if (!address) {
      alert("Please connect your wallet first!");
      getOwner(); // Try to get the address
      return;
    }

    const newProduct = {
      name: productName.trim(),
      description: description.trim() || "No description available",
      price: parseFloat(price) || 0,
      currency: currency || "ETH",
      quantity: parseInt(quantity) || 1,
      asset_type: "NFT", // ✅ Fixed field name
      category: category || "Other",
      owner: address,
      img: image || "",
      contractAddress: generateTokenID(42), // Generate a mock contract address
      tokenId: generateTokenID(15),
      in_stock: true,
    };

    console.log("Sending product data:", newProduct); // Debug log

    axios
      .post("/api/create", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Product created successfully!");
        navigate("/shop");
      })
      .catch((error) => {
        console.error("Full error:", error.response?.data || error.message);
        alert(
          "Error creating product: " +
            (error.response?.data?.detail || error.message)
        );
      });
  };

  return (
    <>
      <MainNav />
      <div style={pageStyle}>
        <div id="create-product-page" style={containerStyle}>
          <h1 style={headingStyle} id="heading-container">
            CREATE NEW PRODUCT
          </h1>
          <form
            onSubmit={handleFormSubmit}
            style={formStyle}
            id="create-product-form"
          >
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={commonInputStyle}
              required
            />

            <label>Price:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={commonInputStyle}
              required
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={commonInputStyle}
              required
            />

            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={commonInputStyle}
            >
              <option value="Animal">Animal</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Tree">Tree</option>
              <option value="Agriculture products">Agriculture products</option>
              <option value="Other">Other</option>
            </select>

            <label>Quantity:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={commonInputStyle}
              required
            />

            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={commonInputStyle}
            />

            {image && (
              <img
                src={image}
                alt="Uploaded Preview"
                style={{ width: "100%", margin: "5px", borderRadius: "5px" }}
              />
            )}

            <input
              type="submit"
              id="create-product"
              value="Create Product"
              style={buttonStyle}
            />
          </form>
          {/* {showPopup && (
            <WalletPopup
              bidAmount={0.2}
              balance={30033}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            /> */}
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export { CreateProduct };
