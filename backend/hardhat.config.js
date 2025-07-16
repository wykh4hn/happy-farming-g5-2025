require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache default URL
      accounts: [
        // Add your Ganache private keys here
        "0xf7cf333f55866334588fe4f3393cd5eb02543e51e88580110df51dedc953adc4"
      ]
    }
  }
};