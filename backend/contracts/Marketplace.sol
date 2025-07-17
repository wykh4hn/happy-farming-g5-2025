// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Marketplace {
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
    
    uint256 public nextProductId = 1;
    uint256 public nextPurchaseId = 1;
    
    mapping(uint256 => Product) public products;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256[]) public userPurchases;
    
    event ProductCreated(uint256 indexed productId, string name, uint256 price);
    event ProductPurchased(uint256 indexed purchaseId, uint256 indexed productId, address indexed buyer, uint256 amount);
    
    function createProduct(string memory name, string memory description, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        
        products[nextProductId] = Product({
            id: nextProductId,
            name: name,
            description: description,
            price: price,
            seller: payable(msg.sender),
            active: true
        });
        
        emit ProductCreated(nextProductId, name, price);
        nextProductId++;
    }
    
    function buyProduct(uint256 productId) external payable {
        Product storage product = products[productId];
        require(product.active, "Product is inactive");
        require(msg.value >= product.price, "Not enough ETH sent");
        
        purchases[nextPurchaseId] = Purchase({
            purchaseId: nextPurchaseId,
            productId: productId,
            buyer: msg.sender,
            timestamp: block.timestamp,
            amount: msg.value
        });
        
        userPurchases[msg.sender].push(nextPurchaseId);
        
        product.seller.transfer(msg.value);
        
        emit ProductPurchased(nextPurchaseId, productId, msg.sender, msg.value);
        nextPurchaseId++;
    }
    
    function getPurchases(address user) external view returns (Purchase[] memory) {
        uint256[] memory purchaseIds = userPurchases[user];
        Purchase[] memory userPurchasesList = new Purchase[](purchaseIds.length);
        
        for (uint256 i = 0; i < purchaseIds.length; i++) {
            userPurchasesList[i] = purchases[purchaseIds[i]];
        }
        
        return userPurchasesList;
    }
}