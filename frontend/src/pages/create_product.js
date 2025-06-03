import "../styles/styles.css";
import "../styles/create.css";
import "../styles/create-product.css";

import React, { useState } from "react";
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Created:", productName, price, image);
    alert("Product created!");
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
