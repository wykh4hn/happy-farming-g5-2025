//sorry bros i asked Copilot to fix the problems bc when i edit something for the products, it continuously getting errors
//so i replaced all (just a little bit) -khanh
import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

// ab the localStorage, i learned smt and it is quite useful tho :))))
const getProductsFromLocalStorage = () => {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  return storedProducts;
};

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(getProductsFromLocalStorage());
  }, []);

  const filteredProducts = productList.filter((product) => {
    const matchSearch =
      (product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>

        {/* search */}
        <input
          type="text"
          id="search"
          placeholder="Search for product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Categories */}
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Animal">Animal</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Tree">Tree</option>
          <option value="Agriculture products">Agriculture products</option>
          <option value="Other">Other</option>
        </select>

        {/*the product list, i changed that tho it is so hard so... */}
        <div id="shop" className="main-content">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="product" key={index}>
                <img
                  src={product.img ? product.img : "/default-image.jpg"}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
                <h3>
                  {product.price} {product.currency}
                </h3>
                <p>{product.description}</p>
                <Link to={"/product/" + product.name} className="detail">
                  Details
                </Link>
              </div>
            ))
          ) : (
            <h3>
              Uh oh, it's not here. Wanna add more products?{" "}
              <Link to="/create-product" id="create-product">
                Create new product
              </Link>
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Shop };
