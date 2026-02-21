# 🏦 Token Vault dApp - UI Mockup

A clean, simple UI mockup for a Token Vault dApp. This is **frontend only** with no blockchain integration - perfect for demonstrating UI/UX design or as a starting template.

## 📋 Features

- **Wallet Connection** - Mock connection interface
- **Vault Information** - Display balances and contract info
- **Deposit Form** - ETH deposit interface
- **Withdraw Form** - ETH withdrawal interface with MAX button
- **Owner Actions** - Owner-only withdraw all button
- **Responsive Design** - Works on desktop and mobile
- **Clean UI** - Simple, modern interface

## 🛠️ Tech Stack

- React 18
- Vite
- Pure CSS (no frameworks)
- JavaScript (ES6+)

## 📁 Project Structure

```
token-vault-ui/
├── src/
│   ├── components/
│   │   ├── WalletConnect.jsx    # Wallet connection UI
│   │   ├── VaultInfo.jsx        # Vault information display
│   │   ├── Deposit.jsx          # Deposit form
│   │   ├── Withdraw.jsx         # Withdraw form
│   │   └── OwnerActions.jsx     # Owner actions UI
│   ├── App.jsx                  # Main app
│   ├── App.css                  # Styling
│   └── main.jsx                 # Entry point
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Extract & Install

```bash
unzip token-vault-ui.zip
cd token-vault-ui
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open Browser

Navigate to: `http://localhost:5173`

That's it! The UI mockup is now running.

## 🎨 What's Included

### Components

1. **WalletConnect** 
   - Connect/Disconnect button
   - Shows mock wallet address
   - Connection status indicator

2. **VaultInfo**
   - User vault balance
   - Total vault balance
   - Contract owner address
   - Current network display
   - Refresh button

3. **Deposit**
   - Amount input field
   - Deposit button
   - Success/error message display
   - Form validation

4. **Withdraw**
   - Amount input field
   - MAX button (sets max balance)
   - Available balance display
   - Withdraw button
   - Success/error messages

5. **OwnerActions**
   - Owner badge
   - Withdraw All button
   - Warning styling
   - Can be toggled on/off

## 🎯 Mock Data

All data is currently mocked:
- Wallet address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- User balance: `2.5 ETH`
- Vault balance: `15.8 ETH`
- Network: `Sepolia Testnet`
- Owner: `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`

To change mock data, edit the component files directly.

## 🔧 Customization

### Changing Colors

Edit `src/App.css`:
```css
/* Header gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button colors */
backgroundColor: '#4CAF50', /* Deposit - Green */
backgroundColor: '#FF9800', /* Withdraw - Orange */
backgroundColor: '#f44336', /* Danger - Red */
```

### Changing Mock Data

Edit component files:
```javascript
// In VaultInfo.jsx
const userBalance = '2.5';
const vaultBalance = '15.8';

// In Withdraw.jsx
const userBalance = '2.5';
```

### Hiding Owner Actions

In `OwnerActions.jsx`:
```javascript
const isOwner = false; // Set to false to hide
```

## 📝 Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 💡 Use Cases

- **UI/UX Design Demo** - Show clients what the dApp will look like
- **Frontend Template** - Starting point for blockchain integration
- **Student Projects** - Learn React component structure
- **Prototyping** - Test user flows before coding blockchain logic
- **Presentations** - Demo the interface without needing a wallet

## 🎓 Learning Points

This mockup demonstrates:
- ✅ React component structure
- ✅ State management with useState
- ✅ Form handling and validation
- ✅ Conditional rendering
- ✅ Inline CSS-in-JS styling
- ✅ Responsive grid layouts
- ✅ User feedback (messages, loading states)

## 🔄 Next Steps

To add blockchain integration:

1. Install ethers.js:
   ```bash
   npm install ethers@6
   ```

2. Replace mock data with actual contract calls
3. Add MetaMask connection logic
4. Implement transaction handling
5. Add error handling for blockchain errors

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🎨 Design Notes

- **Clean & Simple** - Focus on functionality
- **Good Spacing** - Comfortable reading experience
- **Clear Hierarchy** - Important info stands out
- **Responsive** - Works on all screen sizes
- **Accessible** - Good contrast and readable fonts

## 📄 License

MIT License - Use freely for any purpose

---

**This is a UI mockup only. No blockchain integration included.**

For questions or improvements, feel free to modify and experiment!

**Happy Building! 🚀**
