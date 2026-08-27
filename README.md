# Happy Farming - Web3 Agricultural Marketplace

Our project, "Happy Farming", is a blockchain-based project allowing the exchange of agricultural products via blockchain technology. We implemented a hybrid architecture that leverages the security and transparency of smart contracts for transactions, while utilizing a traditional relational database for efficient off-chain data querying and storage.

## System Architecture

The project is divided into four core interconnected layers:

### 1. Off-Chain Storage & Data Access (MySQL + SQLAlchemy)
To handle complex relational data (user profiles, product metadata, and indexed transaction histories) efficiently, we designed a robust relational schema in **MySQL**. 
* **Data Access Layer:** Built with **Python** and **SQLAlchemy ORM** to strictly decouple database operations from core business logic.
* **Custom SQL:** Optimized raw SQL queries are utilized for complex marketplace endpoints to ensure high performance.

### 2. Backend REST API (Flask)
The core bridge between the frontend and the database. 
* Developed using **Flask**, providing secure and scalable RESTful endpoints.
* Fully covered by automated tests to ensure API stability and reliable data mutations.

### 3. On-Chain Smart Contracts (Solidity + Hardhat)
The marketplace contract acts as a decentralized platform for product listing and secure purchases. 
* **Security First:** Inherits from **OpenZeppelin** libraries, applying `onlyOwner`, `whenNotPaused`, and `nonReentrant` modifiers to protect against unauthorized access and reentrancy attacks.
* **Core Functions:** Supports lifecycle management (`createProduct`, `deactivateProduct`), secure payments (`buyProduct`), and owner administrative controls (`pause`, `unpause`).

### 4. Client Interface (ReactJS + ethers.js)
A modern user interface that seamlessly integrates on-chain smart contract states with off-chain REST API data. It handles MetaMask wallet connections, transaction submissions directly from the browser, and reconstructs a user's activity timeline.

## Key Features
* **Hybrid State Synchronization:** Keeps the MySQL database continuously synced with on-chain events (e.g., `ProductCreated`, `ProductPurchased`, `ProductDeactivated`).
* **Automated & Manual Testing:** Comprehensive test coverage for the Python API and Hardhat smart contracts.
* **Admin Dashboard:** Contract owners can pause the marketplace during emergencies or permanently deactivate fraudulent listings.

---

## Getting Started (How to Run Locally)

Since this is a hybrid architecture, you need to run three separate environments. Please ensure you have **Node.js**, **Python 3.x**, and **MySQL** installed on your machine.

### 1. Smart Contracts (Hardhat)
You need to deploy the smart contracts to a local blockchain first, so the frontend and backend can interact with them.

```bash
# Navigate to the smart contract directory
cd contracts

# Install dependencies
npm install

# Start a local Hardhat node (Leave this terminal running)
npx hardhat node

# Open a NEW terminal, deploy the contracts to the local network
npx hardhat run scripts/deploy.js --network localhost