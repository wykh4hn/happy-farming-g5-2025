// This is for imply and connect MetaMask to this.
// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import { MainNav } from "../components/nav";
import "../styles/wallet.css";

function Wallet() {
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const [walletConnected, setWalletConnected] = useState(false);

  // Button handler button for handling a
  // request event for metamask
const [isConnecting, setIsConnecting] = useState(false);

const btnhandler = async () => {
  if (window.ethereum) {
    if (isConnecting) return; // Prevent multiple clicks
    setIsConnecting(true);
    try {
      const res = await window.ethereum.request({ method: "eth_requestAccounts" });
      accountChangeHandler(res[0]);
    } catch (error) {
      console.error("MetaMask connection error:", error);
      alert(error.message || "Failed to connect wallet.");
    } finally {
      setIsConnecting(false);
    }
  } else {
    alert("Please install the MetaMask extension!");
  }
};

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          address: address,
          Balance: ethers.formatEther(balance),
        });
        setWalletConnected(true);
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    // Setting a balance
    getbalance(account);
  };

  return (
    <div className="Wallet">
      {/* Calling all values which we 
       have stored in usestate */}
      <MainNav />

      <Card className="text-center">
        <p>
          {"Wallet status: " +
            (walletConnected ? "Connected!" : "Not connected")}
        </p>
        <Card.Header>
          <strong>Address: </strong>
          {data.address}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {data.Balance}
          </Card.Text>
          <Button onClick={btnhandler} variant="primary">
            Connect to wallet
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export { Wallet };
