
import React, { useState } from "react";
import { MainNav } from "../components/nav"; 
import { Link } from "react-router-dom";


const defaultProducts = [
    {
        name: "LEAF MUSTARD",
        price: "10",
        currency: "USD",
        img: "https://garden.org/pics/2011-11-21/saltmarsh/25621f.jpg",
        description: "Not for salad but still yummy.",
        category: "Vegetable",
        quantity: "12",
        timestamp: new Date().toISOString(),
        id: Date.now(),
        bought: false,
        assetType: "NFT", 
        contractAddress: "0x123456789abcdef", 
        tokenId: "101", 
        owner: "0xabcdef123456789", 
        tradeable: true, 
    },
    {
        name: "RICE PADDY",
        price: "3",
        currency: "USD",
        img: "https://www.davaocatholicherald.com/wp-content/uploads/2018/04/rice-crop.jpg",
        description: "Come from the field this morning",
        category: "Vegetable", 
        quantity: "12",
        timestamp: new Date().toISOString(),
        id: Date.now() + 1,
        bought: false,
        assetType: "NFT", 
        contractAddress: "0x123456789abcdef", 
        tokenId: "101", 
        owner: "0xabcdef123456789", 
        tradeable: true, 
    },
    {
        name: "MANGO",
        price: "2",
        currency: "USD",
        img: "https://www.freshknowledge.eu/upload/c8e39753-8916-4e3d-84be-c817f8ffac1a_shutterstock_107801765.jpg",
        quantity: "12",
        timestamp: new Date().toISOString(),
        id: Date.now() + 2,
        bought: false,
        assetType: "NFT", 
        contractAddress: "0x123456789abcdef", 
        tokenId: "101", 
        owner: "0xabcdef123456789", 
        tradeable: true, 
    },
    {
        name: "RICE",
        price: "12",
        currency: "USD",
        img: "https://www.organicfacts.net/wp-content/uploads/rice-1.jpg",
        quantity: "12",
        timestamp: new Date().toISOString(),
        id: Date.now() + 1,
        bought: false,
        assetType: "NFT", 
        contractAddress: "0x123456789abcdef", 
        tokenId: "101", 
        owner: "0xabcdef123456789", 
        tradeable: true, 
    },
];

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = defaultProducts.filter((product) => {
        const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    const bgImage = `${process.env.PUBLIC_URL}/background.png`;

    const homeStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
    };

    const headerContainerStyle = {
        position: "absolute",
        top: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        background: "rgba(188, 222, 214, 0.9)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
    };

    const searchContainerStyle = {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
    };

    const inputStyle = {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "200px"
    };

    const selectStyle = {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "200px",
    };

    const productsContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "290px", 
    };

    const productStyle = {
        background: "rgba(255, 255, 255, 0.8)",
        margin: "10px",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "left",
        width: "300px",
        position: "relative",
    };

    const imgStyle = {
        width: "100%",
        height: "200px",
        maxHeight: "200px",
        display: "block",
        objectFit: "cover",
        borderRadius: "10px"
    };
    
    const buttonStyle = {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        backgroundColor: "rgba(188, 222, 214, 0.9)",
        color: "black",
        padding: "8px 15px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)"
    };

    return (
        <>
            <MainNav />
            <div id="shop-container" style={homeStyle}>
                {/* Header + Search & Category */}
                <div style={headerContainerStyle}>
                    <h1>SHOPPING WITH US</h1>
                    {/* Search & Category */}
                    <div style={searchContainerStyle}>
                        <input
                            type="text"
                            placeholder="Search for product..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={inputStyle}
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="All">All Categories</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Tree">Tree</option>
                            <option value="Agriculture products">Agriculture products</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Product List */}
                <div style={productsContainerStyle}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} style={productStyle}>
                            <img src={product.img} alt={product.name} style={imgStyle} />
                            <h4>{product.name.toUpperCase()}</h4>
                            <p>{product.price} {product.currency}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Asset Type: {product.assetType}</p>
                            <p>By: {product.owner}</p>
                            <Link style={buttonStyle} to="/details">Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export { Shop };