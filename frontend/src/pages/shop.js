import React, { useEffect, useState } from "react";
import { MainNav } from "../components/nav";
import { Link } from "react-router-dom";

import axios from "axios";
import "../styles/shop.css";

// we just need to store things into defaultProducts

// const api = axios
//   .get("/api/products")
//   .then(() => {})
//   .catch(() => {})
//   .finally(() => {});

const defaultProducts = [];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      // what
      .get("/api/products")
      .then((response) => {
        console.log("Response:", response.data);
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
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const bgImage = `${process.env.PUBLIC_URL}/background.png`;

  return (
    <>
      <MainNav />
      <div id="shop-container" className="home">
        {/* Header + Search & Category */}
        <div className="header-container" id="header-container">
          <h1>SHOPPING WITH US</h1>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              {/* options here */}
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.img}
                alt={product.name}
                className="product-img"
              />
              <h4>{product.name.toUpperCase()}</h4>
              <p>
                {product.price} {product.currency}
              </p>
              <p>Quantity: {product.quantity}</p>
              <p>Asset Type: {product.assetType}</p>
              <p>By: {product.owner}</p>
              <Link className="details-button" to="/details">
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
