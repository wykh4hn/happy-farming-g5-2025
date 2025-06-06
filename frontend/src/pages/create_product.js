import "../styles/styles.css";
import "../styles/create.css";
import "../styles/create-product.css";
import { WalletPopup } from "./walletPopup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./nav";
import { Footer } from "./footer";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Animal");
  const [showPopup, setShowPopup] = useState(false); // ✅ Khai báo popup state
  const navigate = useNavigate();

  // ✅ Xử lý upload ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  // ✅ Submit form để kích hoạt popup
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Gọi popup ví
  };

  // ✅ Khi xác nhận trong popup ví
  const handleConfirm = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName.trim(),
      price: price || "0",
      img: image,
      currency,
      description: description.trim() || "No description available",
      category: category || "Other",
      timestamp: new Date().toISOString(),
      id: Date.now(),
      bought: false // ✅ Mặc định chưa mua
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));

    alert("Product created! Happy farming!");
    navigate("/shop");
  };

  // ✅ Khi huỷ tạo sản phẩm
  const handleCancel = () => {
    console.log("Product creation canceled.");
    setShowPopup(false);
  };

  return (
    <div>
      <MainNav />
      <div id="create-product-page" className="main-content">
        <h1>CREATE NEW PRODUCT</h1>

        <form onSubmit={handleFormSubmit}>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <label>Price:</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">$ - USD</option>
            <option value="EUR">€ - EUR</option>
            <option value="VND">₫ - VND</option>
            <option value="JPY">¥ - JPY</option>
          </select>

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Animal">Animal</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Tree">Tree</option>
            <option value="Agriculture products">Agriculture products</option>
            <option value="Other">Other</option>
          </select>

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {image && (
            <img src={image} alt="Uploaded Preview" className="preview-img" />
          )}

          <input type="submit" id="create-product" value="Create Product" />
        </form>

        {showPopup && (
          <WalletPopup
            bidAmount={0.2}
            balance={30033}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export { CreateProduct };
