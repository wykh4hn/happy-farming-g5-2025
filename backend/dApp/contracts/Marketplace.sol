// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is Ownable, Pausable, ReentrancyGuard {
    // Modifier: Only the seller of the product can call
    modifier onlySeller(uint256 productId) {
        require(products[productId].seller == msg.sender, "Not product seller");
        _;
    }
    // === Get All Active Products ===
    function getActiveProducts() external view returns (Product[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _productIds.current(); i++) {
            if (products[i].active) {
                count++;
            }
        }
        Product[] memory activeProducts = new Product[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= _productIds.current(); i++) {
            if (products[i].active) {
                activeProducts[idx] = products[i];
                idx++;
            }
        }
        return activeProducts;
    }

    // === Set Product Price (Seller Only, if not sold) ===
    function setProductPrice(uint256 productId, uint256 newPrice) external onlySeller(productId) {
        Product storage product = products[productId];
        require(product.active, "Product already sold or inactive");
        require(newPrice > 0, "Price must be greater than zero");
        product.price = newPrice;
        // Optionally emit an event for price change
    }

    // === Withdraw contract balance (Owner only) ===
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }

    // === Get All Purchases (Admin only) ===
    function getAllPurchases() external view onlyOwner returns (Purchase[] memory) {
        uint256 count = _purchaseIds.current();
        Purchase[] memory allPurchases = new Purchase[](count);
        for (uint256 i = 0; i < count; i++) {
            allPurchases[i] = purchases[i + 1];
        }
        return allPurchases;
    }
    using Counters for Counters.Counter;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price; // in wei
        address payable seller;
        bool active;
    }

    struct Purchase {
        uint256 purchaseId;
        uint256 productId;
        address buyer;
        uint256 timestamp;
        uint256 amount;
    }

    Counters.Counter private _productIds;
    Counters.Counter private _purchaseIds;

    mapping(uint256 => Product) public products;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256[]) public userPurchases;

    event ProductCreated(uint256 indexed productId, string name, uint256 price);
    event ProductPurchased(uint256 indexed purchaseId, uint256 indexed productId, address indexed buyer, uint256 amount);
    event ProductDeactivated(uint256 indexed productId);

    // constructor(address initialOwner) Ownable(initialOwner) {
        
    // }

    // === Product Creation ===
    function createProduct(string memory name, string memory description, uint256 price) external whenNotPaused {
        require(price > 0, "Price must be greater than zero");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");

        _productIds.increment();
        uint256 productId = _productIds.current();

        products[productId] = Product({
            id: productId,
            name: name,
            description: description,
            price: price,
            seller: payable(msg.sender),
            active: true
        });

        emit ProductCreated(productId, name, price);
    }

    // === Buy Product ===
    function buyProduct(uint256 productId) external payable nonReentrant whenNotPaused {
        Product storage product = products[productId];
        require(product.active, "Product is inactive");
        require(msg.value >= product.price, "Not enough ETH sent");

        _purchaseIds.increment();
        uint256 purchaseId = _purchaseIds.current();

        purchases[purchaseId] = Purchase({
            purchaseId: purchaseId,
            productId: productId,
            buyer: msg.sender,
            timestamp: block.timestamp,
            amount: product.price
        });

        userPurchases[msg.sender].push(purchaseId);

        product.active = false; // State change before external call

        product.seller.transfer(product.price);

        // Refund any excess amount sent by the buyer
        if (msg.value > product.price) {
            payable(msg.sender).transfer(msg.value - product.price);
        }

        emit ProductPurchased(purchaseId, productId, msg.sender, product.price);
    }

    // === Get Purchases by User ===
    function getPurchases(address user) external view returns (Purchase[] memory) {
        uint256[] memory purchaseIds = userPurchases[user];
        Purchase[] memory result = new Purchase[](purchaseIds.length);

        for (uint256 i = 0; i < purchaseIds.length; i++) {
            result[i] = purchases[purchaseIds[i]];
        }

        return result;
    }

    // === Admin Only Functions ===
    function pause() public override onlyOwner {
        // Custom logic before pausing (optional)
        super._pause();
        // Custom logic after pausing (optional)
    }

    function unpause() public override onlyOwner {
        // Custom logic before unpausing (optional)
        super._unpause();
        // Custom logic after unpausing (optional)
    }

    function deactivateProduct(uint256 productId) external onlyOwner {
        Product storage product = products[productId];
        require(product.active, "Already inactive");
        product.active = false;
        emit ProductDeactivated(productId);
    }
}