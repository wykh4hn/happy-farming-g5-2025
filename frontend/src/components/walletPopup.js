import React from 'react';
import '../styles/walletPopup.css';

const WalletPopup = ({ bidAmount, balance, onConfirm, onCancel }) => {
  return (
    <>
      <div className="wallet-overlay"></div>
      <div className="wallet-popup">
        <div className="wallet-header">
          <h3>Wallet Account</h3>
          <div className="wallet-address">0x8626f...C1199</div>
        </div>
        <div className="wallet-balance">$1.000000000 USD</div>
        <div className="wallet-balance-info">
          <span>+ $0.1 (+10%) </span>
          <a href="javascript:void(0)" className="wallet-portfolio">Portfolio ↗</a>
        </div>
        {/*just a demo im bad at math :))) -khanh*/}
        <div className="actions-container">
          <button className="action-button">
            <span className="action-icon">Buy</span>
          </button>
          <button className="action-button">
            <span className="action-icon">Sell</span>
          </button>

          <button className="action-button">
            <span className="action-icon">Send</span>
          </button>
          <button className="action-button">
            <span className="action-icon">Receive</span>
          </button>
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
            <div>bidding {bidAmount} ETH?</div>
            <div className="transaction-amount">${bidAmount * 1270.35}</div>
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
      </div>
    </>
  );
};

export { WalletPopup };