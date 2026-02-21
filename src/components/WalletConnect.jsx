import { useEffect, useState } from 'react';

import { ethers } from "ethers";
import { useWallet } from '../context/WalletContext';


export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  // const [address, setAddress] = useState('');
  const [connectedAddress, setConnectedAddress] = useState("");
  const { connect, disconnect, address, provider } = useWallet();

  useEffect(() => {
    console.log("Connecteds address", address)
    handleConnect()
  },[address])
  

  // Connect web3 wallet
  const connectWallet = async () => {
    connect();
  }

  const handleConnect = () => {
    // Mock connection - just UI demo
    connectWallet();
    setIsConnected(true);
    setConnectedAddress(address)

  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Wallet Connection</h2>

      {!isConnected ? (
        <div>
          <button onClick={handleConnect} style={styles.connectButton}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div style={styles.connectedBox}>
          <p style={styles.label}>✅ Connected</p>
          <p style={styles.address}>{connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}</p>
          <p style={styles.fullAddress}>{connectedAddress}</p>
          <button onClick={handleDisconnect} style={styles.disconnectButton}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '20px',
  },
  connectButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  connectedBox: {
    backgroundColor: '#e8f5e9',
    padding: '15px',
    borderRadius: '5px',
  },
  label: {
    margin: '0 0 5px 0',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  address: {
    margin: '5px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  fullAddress: {
    margin: '5px 0 15px 0',
    fontSize: '12px',
    color: '#666',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },
  disconnectButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
