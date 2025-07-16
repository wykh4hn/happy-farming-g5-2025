// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductStore {
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price; // in wei
        address seller;
        bool active;
    }
    
    struct Purchase {
        uint256 purchaseId;
        uint256 productId;
        address buyer;
        uint256 timestamp;
        uint256 amount;
        string productName;
    }
    
    mapping(uint256 => Product) public products;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256[]) public userPurchases;
    
    uint256 public nextProductId = 1;
    uint256 public nextPurchaseId = 1;
    
    address public owner;
    
    event ProductAdded(uint256 indexed productId, string name, uint256 price);
    event ProductPurchased(uint256 indexed purchaseId, uint256 indexed productId, address indexed buyer, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        
        // Add some sample products
        addProduct("Cool NFT Art", "Digital artwork NFT", 0.1 ether);
        addProduct("Blockchain Course", "Learn blockchain development", 0.05 ether);
        addProduct("Crypto Sticker Pack", "Cool crypto stickers", 0.01 ether);
    }
    
    function addProduct(string memory _name, string memory _description, uint256 _price) public onlyOwner {
        products[nextProductId] = Product({
            id: nextProductId,
            name: _name,
            description: _description,
            price: _price,
            seller: owner,
            active: true
        });
        
        emit ProductAdded(nextProductId, _name, _price);
        nextProductId++;
    }
    
    function purchaseProduct(uint256 _productId) public payable {
        Product storage product = products[_productId];
        
        require(product.active, "Product not available");
        require(msg.value >= product.price, "Insufficient payment");
        
        // Create purchase record
        purchases[nextPurchaseId] = Purchase({
            purchaseId: nextPurchaseId,
            productId: _productId,
            buyer: msg.sender,
            timestamp: block.timestamp,
            amount: msg.value,
            productName: product.name
        });
        
        // Add to user's purchase history
        userPurchases[msg.sender].push(nextPurchaseId);
        
        // Transfer payment to seller
        payable(product.seller).transfer(msg.value);
        
        emit ProductPurchased(nextPurchaseId, _productId, msg.sender, msg.value);
        nextPurchaseId++;
    }
    
    function getProduct(uint256 _productId) public view returns (Product memory) {
        return products[_productId];
    }
    
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](nextProductId - 1);
        
        for (uint256 i = 1; i < nextProductId; i++) {
            allProducts[i - 1] = products[i];
        }
        
        return allProducts;
    }
    
    function getUserPurchases(address _user) public view returns (Purchase[] memory) {
        uint256[] memory purchaseIds = userPurchases[_user];
        Purchase[] memory userPurchaseList = new Purchase[](purchaseIds.length);
        
        for (uint256 i = 0; i < purchaseIds.length; i++) {
            userPurchaseList[i] = purchases[purchaseIds[i]];
        }
        
        return userPurchaseList;
    }
    
    function getPurchase(uint256 _purchaseId) public view returns (Purchase memory) {
        return purchases[_purchaseId];
    }
}