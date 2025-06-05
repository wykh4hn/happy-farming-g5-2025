//sorry bros i asked Copilot to fix the problems bc when i edit something for the products, it continuously getting errors
//so i replaced all (just a little bit) -khanh
import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";

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

  //i added this to buy the product, but it is not working yet
  // i will fix it later, but now i  so tired
  const handleBuy = (product) => {
    const updatedProducts = productList.map((p) =>
      p.name === product.name ? { ...p, bought: true } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProductList(updatedProducts);
    alert(`You have bought "${product.name}" successfully!`);
  };

  const handleCancelProductPurchase = (product) => {
    const updatedProducts = productList.map((p) =>
      p.name === product.name ? { ...p, bought: false } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProductList(updatedProducts);
    alert(`Purchase for "${product.name}" has been cancelled.`);
  };
  
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

  //this is the style tho bc css doesnt work
  const productDescriptionStyle = {
    fontSize: "0.9em",
    color: "#f2efef",
    textAlign: "left",
    marginBottom: "10px",
  };

  //nah css works now but it think i will keep this code for later use

  return (
    <div>
      <MainNav />
      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>

        <div className="search-categories">
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
        </div>

        {/*the product list, i changed that tho it is so hard so... */}
        <div id="shop" className="main-content">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="product" key={index}>
                <img
                  src={product.img ? product.img : "/default-image.jpg"}
                  alt={product.name}
                />
                <h4>{product.name.toUpperCase()}</h4>
                <h3>
                  {product.price} {product.currency}
                </h3>
                <p style={productDescriptionStyle}>{product.description}</p>
                {/* if we have not bought this product yet */}
                {/* if not yet bought, show Buy button */}
                {!product.bought && (
                  <button id="buy" onClick={() => handleBuy(product)}>Buy</button>
                )}
                {/* i think the detail button quite unesessary tho, we can click on the product to see details (maybe backend) */}
                {/* if already bought, show purchase info and Cancel button */}
                {product.bought && (
                  <>
                    <button id="cancel" onClick={() => handleCancelProductPurchase(product)}>
                      Cancel Purchase
                    </button>
                  </>
                )}
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
