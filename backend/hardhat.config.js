require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts/"
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache default URL
      accounts: [
        // Add your Ganache private keys here
        "0x38f5516f0d9f34e8f9a038fe487a5f2e38b409b17c24ea95f99919cff410e8d2"
      ]
    }
  }
};