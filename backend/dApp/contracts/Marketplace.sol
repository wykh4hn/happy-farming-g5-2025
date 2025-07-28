// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is Ownable, Pausable, ReentrancyGuard {
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

    // === Product Creation ===
    function createProduct(string memory name, string memory description, uint256 price) external whenNotPaused {
        require(price > 0, "Price must be greater than zero");

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
            amount: msg.value
        });

        userPurchases[msg.sender].push(purchaseId);

        product.seller.transfer(msg.value);

        emit ProductPurchased(purchaseId, productId, msg.sender, msg.value);
        product.active = false;
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
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function deactivateProduct(uint256 productId) external onlyOwner {
        Product storage product = products[productId];
        require(product.active, "Already inactive");
        product.active = false;
        emit ProductDeactivated(productId);
    }
}
