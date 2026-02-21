import { ethers } from 'ethers';
import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useVaultContract } from '../contracts/useVaultContract';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const {address} = useWallet(); 
  const  vault  = useVaultContract(true);
  

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }
    if(!address){
      setMessage({ type: 'error', text: 'Wallet not connected' });
      return;
    }

    if(!vault){
      setMessage({ type: 'error', text: 'Vault contract not available' });
      return;
    }

    try{
      const tx = await vault.deposit({value:ethers.parseEther(amount)});
      await tx.wait();
      setMessage({type:'success',text:'Deposited successfully!'})
      setAmount('');

    }catch(error){
      console.error("Deposit error:", error);
      setMessage({ type: 'error', text: 'Deposit failed. Please try again.' });

    }finally{
      setTimeout(() => setMessage({type:'', text:''}),3000)
    }



    // Mock success for UI demo
    setMessage({ type: 'success', text: `✅ Successfully deposited ${amount} ETH!` });
    setAmount('');

    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💰 Deposit ETH</h3>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Amount (ETH)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          style={styles.input}
        />
      </div>

      <button onClick={handleDeposit} style={styles.button}>
        Deposit
      </button>

      {message.text && (
        <div style={{
          ...styles.messageBox,
          ...(message.type === 'error' ? styles.errorBox : styles.successBox),
        }}>
          <p style={styles.messageText}>{message.text}</p>
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
    fontSize: '18px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  messageBox: {
    padding: '12px',
    borderRadius: '5px',
    marginTop: '15px',
  },
  messageText: {
    margin: 0,
    fontSize: '14px',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
};
