import React, { useState } from "react";
import { MainNav } from "../components/nav";
import { Link } from "react-router-dom";

import axios from "axios";
import "../styles/shop.css";

// we just need to store things into defaultProducts

const api = axios
  .get("/products")
  .then(() => {})
  .catch(() => {})
  .finally(() => {});

const defaultProducts = [
  //   {
  //     name: "LEAF MUSTARD",
  //     price: "10",
  //     currency: "USD",
  //     img: "https://garden.org/pics/2011-11-21/saltmarsh/25621f.jpg",
  //     description: "Not for salad but still yummy.",
  //     category: "Vegetable",
  //     quantity: "12",
  //     timestamp: new Date().toISOString(),
  //     id: Date.now(),
  //     bought: false,
  //     assetType: "NFT",
  //     contractAddress: "0x123456789abcdef",
  //     tokenId: "101",
  //     owner: "0xabcdef123456789",
  //     tradeable: true,
  //   },
  //   {
  //     name: "RICE PADDY",
  //     price: "3",
  //     currency: "USD",
  //     img: "https://www.davaocatholicherald.com/wp-content/uploads/2018/04/rice-crop.jpg",
  //     description: "Come from the field this morning",
  //     category: "Vegetable",
  //     quantity: "12",
  //     timestamp: new Date().toISOString(),
  //     id: Date.now() + 1,
  //     bought: false,
  //     assetType: "NFT",
  //     contractAddress: "0x123456789abcdef",
  //     tokenId: "101",
  //     owner: "0xabcdef123456789",
  //     tradeable: true,
  //   },
  //   {
  //     name: "MANGO",
  //     price: "2",
  //     currency: "USD",
  //     img: "https://www.freshknowledge.eu/upload/c8e39753-8916-4e3d-84be-c817f8ffac1a_shutterstock_107801765.jpg",
  //     quantity: "12",
  //     timestamp: new Date().toISOString(),
  //     id: Date.now() + 2,
  //     bought: false,
  //     assetType: "NFT",
  //     contractAddress: "0x123456789abcdef",
  //     tokenId: "101",
  //     owner: "0xabcdef123456789",
  //     tradeable: true,
  //   },
  //   {
  //     name: "RICE",
  //     price: "12",
  //     currency: "USD",
  //     img: "https://www.organicfacts.net/wp-content/uploads/rice-1.jpg",
  //     quantity: "12",
  //     timestamp: new Date().toISOString(),
  //     id: Date.now() + 1,
  //     bought: false,
  //     assetType: "NFT",
  //     contractAddress: "0x123456789abcdef",
  //     tokenId: "101",
  //     owner: "0xabcdef123456789",
  //     tradeable: true,
  //   },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = defaultProducts.filter((product) => {
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
