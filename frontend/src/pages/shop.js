//sorry bros i asked Copilot to fix the problems bc when i edit something for the products, it continuously getting errors
//so i replaced all (just a little bit) -khanh
import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";
<<<<<<< HEAD

//set the default products, i think we can use this to test the shop page
const defaultProducts = [
  {
    name: "JAKE",
    price: "10",
    currency: "USD",
    img: "https://www.treehugger.com/thmb/W04nFnePn2iAP8VXRb-YzSjWI6Y=/3537x2582/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2020__03__rhode-island-hen-7f9b1b93dba8401999c52f85096fbe6c.jpg",
    description: "A healthy chicken for your farm.",
    category: "Animal",
    timestamp: new Date().toISOString(),
    id: Date.now(),
    bought: false
  },
  {
    name: "JENNIFER",
    price: "3",
    currency: "USD",
    img: "https://howtodoright.com/wp-content/uploads/2017/07/cowhero2.jpg",
    description: "She is a very good cow",
    category: "Vegetable",
    timestamp: new Date().toISOString(),
    id: Date.now() + 1,
    bought: false
  },
  {
    name: "MANGO",
    price: "2",
    currency: "USD",
    img: "https://www.freshknowledge.eu/upload/c8e39753-8916-4e3d-84be-c817f8ffac1a_shutterstock_107801765.jpg",
    description: "A sweet mango for your farm.",
    category: "Vegetable",
    timestamp: new Date().toISOString(),
    id: Date.now() + 2,
    bought: false
  },
];

=======
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb

// ab the localStorage, i learned smt and it is quite useful tho :))))
const getProductsFromLocalStorage = () => {
   const storedProducts = JSON.parse(localStorage.getItem("products"));
      if (!storedProducts || storedProducts.length === 0) {
      localStorage.setItem("products", JSON.stringify(defaultProducts));
      return defaultProducts;
  }
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
<<<<<<< HEAD
      const updatedProducts = productList.map((p) =>
        p.id === product.id ? { ...p, bought: true } : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProductList(updatedProducts);
      alert(`You have bought "${product.name}" successfully!`);
    };

  const handleCancelProductPurchase = (product) => {
    const updatedProducts = productList.map((p) =>
      p.id === product.id ? { ...p, bought: false } : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProductList(updatedProducts);
      alert(`Purchase for "${product.name}" has been cancelled.`);
=======
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
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb
  };

  
  const filteredProducts = productList.filter((product) => {
    const matchSearch =
      (product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
<<<<<<< HEAD
    return matchSearch && matchCategory;
=======

      return matchSearch && matchCategory;
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb
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
<<<<<<< HEAD
      
=======
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb
      <div id="shop-container">
        <h1>WELCOME TO OUR SHOP!</h1>

        <div className="search-categories">
<<<<<<< HEAD
          <input
            type="text"
            id="search"
            placeholder="Search for product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

=======
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
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb
        <div id="shop" className="main-content">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="product" key={product.id}>
                <img
                  src={product.img ? product.img : "/default-image.jpg"}
                  alt={product.name}
                />
                <h4>{product.name.toUpperCase()}</h4>
                <h3>
                  {product.price} {product.currency}
                </h3>
                <p style={productDescriptionStyle}>{product.description}</p>
<<<<<<< HEAD
                {!product.bought && (
                  <button id="buy" onClick={() => handleBuy(product)}>Buy</button>
                )}
                {product.bought && (
                  <button id="cancel" onClick={() => handleCancelProductPurchase(product)}>
                    Cancel Purchase
                  </button>
=======
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
>>>>>>> 275f6a37a19e576082ee27a93bcf53467a2315fb
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