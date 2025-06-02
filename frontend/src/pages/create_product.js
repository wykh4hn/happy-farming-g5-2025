import "../styles/styles.css";
import "../styles/create.css";
import React, { useState } from "react";
import { MainNav } from "./nav";
import { Footer } from "./footer";

/*const CreateProduct = () => {
  return (
    <div>
      <MainNav />
      <div class="main-content">
        <form action="get">
          <label htmlFor="name">Name of product:</label>
          <br />
          <input type="text" name="name" id="name" />
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <input type="number" name="price" id="price" />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <input type="submit" value="Add product!" />
        </form>
      </div>
      <Footer />
    </div>
  );
};*/


/*sorry Duc but im gonna change something so we can add the image for the product tho
i just add that past, please test and check againn -Khanh*/ 
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
  };

  return (
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
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageUpload}
        />

        {image && <img src={image} alt="Uploaded Preview" className="preview-img" />}  

        <button type="submit" id="create-product">Create product</button>
      </form>

      <Footer />
    </div>
  );
};

export { CreateProduct };
