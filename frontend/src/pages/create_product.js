import "../styles/styles.css";
import "../styles/create.css";
import "../styles/create-product.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./nav";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

/*sorry Duc but im gonna change something so we can add the image for the product tho
i just add that past, please test and check againn -Khanh*/

// it's ok Khanh =))))))))))))))))))) - Đức
const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Animal"); 
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    name: productName.trim(), 
    price: price || "0",
    img: image,
    description: description.trim() || "No description available",
    category: category || "Other",
  };

  const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  existingProducts.push(newProduct);
  localStorage.setItem("products", JSON.stringify(existingProducts));

  alert("Product created! Happy farming!");
  navigate("/shop");
};


  return (
    <div>
      <Sidebar />
      <div id="create-product-page">
        <MainNav />
        <h1>Create a New Product</h1>

        <form onSubmit={handleSubmit}>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Description:</label> 
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Category:</label> 
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Animal">Animal</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Tree">Tree</option>
            <option value="Agriculture products">Agriculture products</option>
            <option value="Other">Other</option>
          </select>

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {/* that broke the site, gotta fix */}
          {image && (
            <img src={image} alt="Uploaded Preview" className="preview-img" />
          )}

          <input type="submit" id="create-product" value="Create Product" />
        </form>

        <Footer />
      </div>
    </div>
  );
};

export { CreateProduct };
