import "../styles/styles.css";
import "../styles/create.css";
import "../styles/create-product.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNav } from "./nav";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

import imageCompression from "browser-image-compression";
// import console from "console";

/*sorry Duc but im gonna change something so we can add the image for the product tho
i just add that past, please test and check againn -Khanh*/

// it's ok Khanh =))))))))))))))))))) - Đức
const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Animal");
  const navigate = useNavigate();
  //i added something here to handle the image upload
  // sometimes when i test the image, and put console.log(image) it returns null
  // this is why i put these line tho :))) i think thats the best way
  const handleImageUpload = async (event) => {
    let file = event.target.files[0];

    // compress image by browser-image-compression
    try {
      const compressOptions = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, compressOptions);
      console.log(
        `Image compressed from ${file.size / 1024 / 1024} MB to ${
          compressedFile.size / 1024 / 1024
        } MB`
      );

      if (compressedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      }
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Error uploading image!");
    }
  };
  //handle the submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName.trim(),
      price: price || "0",
      img: image,
      currency,
      //i changed this line to use the image state
      // if the image is null, it wont be added to the product -khanh
      description: description.trim() || "No description available",
      category: category || "Other",
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));

    alert("Product created! Happy farming!");
    navigate("/shop"); //it will return to the shop page tho
  };

  return (
    <div>
      <Sidebar />
      <div id="create-product-page" className="main-content">
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
            placeholder="Enter amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

          {/* that broke the site, gotta fix */}
          {/* it's ok Duc this part is fine to me */}
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
