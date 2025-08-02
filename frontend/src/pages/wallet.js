// This is for imply and connect MetaMask to this.
// Importing modules
import React, { useState, useEffect } from "react";
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
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChangeHandler(res[0]);
      } catch (error) {
        console.error("MetaMask connection error:", error);
        // Fix: Properly handle error object
        let errorMessage = "Failed to connect wallet.";

        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === 4001) {
          errorMessage = "User rejected the connection request.";
        } else if (error.code === -32002) {
          errorMessage =
            "MetaMask is already processing a request. Please wait.";
        } else if (typeof error === "string") {
          errorMessage = error;
        }

        alert(errorMessage);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install the MetaMask extension!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = async (address) => {
    try {
      // Fix: Use modern ethers approach
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);

      // Setting balance
      setdata({
        address: address,
        Balance: ethers.formatEther(balance) + " ETH",
      });
      setWalletConnected(true);
    } catch (error) {
      console.error("Error getting balance:", error);
      alert("Failed to get wallet balance.");
    }
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
      Balance: "Loading...",
    });

    // Setting a balance
    getbalance(account);
  };

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            accountChangeHandler(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          accountChangeHandler(accounts[0]);
        } else {
          setdata({ address: "", Balance: null });
          setWalletConnected(false);
        }
      });

      // Cleanup listener on unmount
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            accountChangeHandler
          );
        }
      };
    }
  }, []);

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
          {data.address || "Not connected"}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {data.Balance || "0 ETH"}
          </Card.Text>
          <Button
            onClick={btnhandler}
            variant="primary"
            disabled={isConnecting || walletConnected}
          >
            {isConnecting
              ? "Connecting..."
              : walletConnected
              ? "Connected"
              : "Connect to wallet"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export { Wallet };
