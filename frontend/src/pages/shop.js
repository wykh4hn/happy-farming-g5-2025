import React, { useEffect, useState } from "react";
import { MainNav } from "../components/nav";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/shop.css";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        gap: "20px"
    };

    const inputStyle = {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "200px"
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
    };

    const imgStyle = {
        width: "100%",
        height: "200px",
        maxHeight: "200px",
        display: "block",
        objectFit: "cover",
        borderRadius: "10px"
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
        boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)"
    };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products") 
      .then((response) => {
        if (response.data && response.data.content) {
          setProducts(response.data.content);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  
  const filteredProducts = products.filter((product) => {
    const matchSearch =
      (product.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
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
        <div style={headerContainerStyle}  id="header-container">
          <h1>SHOPPING WITH US</h1>
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
              <p>By: {product.owner}</p>
              <Link className="details-button" to={`/details/${product.id}`} style={buttonStyle}>
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Shop };
