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

//save the transaction to the localStorage tho
const saveTransaction = (product) => {
  const transaction = {
    name: product.name,
    price: product.price,
    currency: product.currency || "$",
    date: new Date().toLocaleString(),
  };
  const existingTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
  existingTransactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(existingTransactions));
};

// handle the cancel purchase 
const handleCancelProductPurchase = (product) => {
  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const indexToRemove = [...transactions].reverse().findIndex(
    (tx) => tx.name === product.name
  );

  if (indexToRemove === -1) {
    const actualIndex = transactions.length - 1 - indexToRemove;
    transactions.splice(actualIndex, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  alert(`Last purchase has been cancelled:<`);
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
      p.id === product.id ? { ...p, bought: true } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProductList(updatedProducts);
    saveTransaction(product); //save the transaction tho
    alert(`You have bought "${product.name}" successfully!`);
  };

  // Updated cancel function to reset the "bought" flag
  const handleCancelProductPurchase = (product) => {
    const updatedProducts = productList.map((p) =>
      p.id === product.id ? { ...p, bought: false } : p
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

                {/* if we have not bought this product yet */}
                {/* if not yet bought, show Buy button */}
                {!product.bought && (
                  <button onClick={() => handleBuy(product)}>Buy</button>
                )}

                {/* if already bought, show purchase info and Cancel button */}
                {product.bought && (
                  <>
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Purchased ✔️
                    </p>
                    <button onClick={() => handleCancelProductPurchase(product)}>
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
