import WalletConnect from './components/WalletConnect';
import VaultInfo from './components/VaultInfo';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import WithdrawSpecfic from './components/WithdrawSpecficAmount';
import OwnerActions from './components/OwnerActions';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏦 Token Vault dApp</h1>
        <p className="subtitle">Deposit and withdraw ETH securely</p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Wallet Connection */}
          <WalletConnect />

          {/* Vault Information */}
          <VaultInfo />

          {/* Action Cards */}
          <div className="action-grid">
            {/* Deposit Card */}
            <Deposit />

            {/* Withdraw Card */}
            <Withdraw />

            {/* Withdraw Specfic Amount Card */}
            <WithdrawSpecfic />
          </div>

          {/* Owner Actions */}
          <OwnerActions />

          {/* Instructions */}
          <div className="instructions">
            <h3>📚 How to Use</h3>
            <ol>
              <li>Connect your wallet</li>
              <li>Make sure you're on the correct network</li>
              <li>Deposit ETH into the vault</li>
              <li>Withdraw your funds anytime</li>
              <li>Contract owner can withdraw all funds</li>
            </ol>
            
            <div className="info-box">
              <p><strong>ℹ️ Note:</strong></p>
              <p>This is a UI mockup only. No blockchain integration included.</p>
              <p>All actions are simulated for demonstration purposes.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React + Vite | UI Mockup Only</p>
      </footer>
    </div>
  );
}

export default App;
