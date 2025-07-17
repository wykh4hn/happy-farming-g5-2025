// components/WalletPopup.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../styles/walletPopup.css'; // Keep your custom styles

const WalletPopup = ({ bidAmount, onConfirm, onCancel }) => {
  const [account, setAccount] = useState('');
  const [balanceEth, setBalanceEth] = useState('0.000000');
  const [balanceUsd, setBalanceUsd] = useState('0.00');
  const [loading, setLoading] = useState(false);

  const ETH_TO_USD = 1270.35;

  const fetchWalletInfo = async () => {
    try {
      setLoading(true);
      if (!window.ethereum) {
        alert('MetaMask is not detected!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      const balanceFormatted = ethers.formatEther(balance);
      setAccount(address);
      setBalanceEth(parseFloat(balanceFormatted).toFixed(6));
      setBalanceUsd((balanceFormatted * ETH_TO_USD).toFixed(2));
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletInfo();
  }, []);

  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Not connected';

  return (
    <>
      <div className="wallet-overlay"></div>
      <div className="wallet-popup">
        <div className="wallet-header">
          <h3>Wallet Account</h3>
          <div className="wallet-address">{shortAddress}</div>
        </div>
        <div className="wallet-balance">${balanceUsd} USD</div>
        <div className="wallet-balance-info">
          <span>{balanceEth} ETH</span>
          <button
            className="wallet-portfolio"
            onClick={() =>
              account && window.open(`https://etherscan.io/address/${account}`, '_blank')
            }
          >
            Portfolio ↗
          </button>
        </div>

        <div className="actions-container">
          <button className="action-button"><span className="action-icon">Buy</span></button>
          <button className="action-button"><span className="action-icon">Sell</span></button>
          <button className="action-button"><span className="action-icon">Send</span></button>
          <button className="action-button"><span className="action-icon">Receive</span></button>
        </div>

        <div className="wallet-tabs">
          <span className="tab">Tokens</span>
          <span className="tab">NFTs</span>
          <span className="tab active">Activity</span>
        </div>

        <div className="transaction">
          <div className="transaction-left">
            <span className="transaction-icon">↕️</span>
            <div>
              <div>Buy Asset</div>
              <div className="confirmed">Available</div>
            </div>
          </div>
          <div className="transaction-right">
            <div>Purchasing {bidAmount} ETH</div>
            <div className="transaction-amount">
              ${(bidAmount * ETH_TO_USD).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="popup-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel purchase
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm purchase
          </button>
        </div>

        {loading && <div className="wallet-loading">🔄 Fetching wallet info...</div>}
      </div>
    </>
  );
};

export { WalletPopup };