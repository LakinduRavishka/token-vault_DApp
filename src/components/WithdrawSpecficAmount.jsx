import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import { useVaultContract } from "../contracts/useVaultContract";

export default function WithdrawSpecfic() {
  const { address } = useWallet();
  const vault = useVaultContract(true);

  const [message, setMessage] = useState({ type: "", text: "" });
  const [amount, setAmount] = useState("");
  const [userBalance, setUserBalance] = useState("0");

  useEffect(() => {
    async function loadBalance() {
      if (!vault || !address) return;

      try {
        const balanceWei = await vault.balances(address);
        const balanceEth = ethers.formatEther(balanceWei);

        setUserBalance(balanceEth);

        console.log("User vault balance:", balanceEth);
      } catch (err) {
        console.error("Balance load error:", err);
      }
    }

    loadBalance();
  }, [vault, address]);

  const handleWithdrawSpecfic = async () => {
    const owner = await vault.owner();
    if (owner.toLowerCase() !== address.toLowerCase()) {
      setMessage({
        type: "error",
        text: "You are not the owner of this contract",
      });
      return;
    }
    console.log("admin owner is: ", owner);

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: "Enter valid amount" });
      return;
    }

    if (!address) {
      setMessage({ type: "error", text: "Wallet not connected" });
      return;
    }

    if (!vault) {
      setMessage({ type: "error", text: "Vault not ready" });
      return;
    }

    if (parseFloat(amount) > parseFloat(userBalance)) {
      setMessage({
        type: "error",
        text: `Insufficient balance. You have ${userBalance} ETH`,
      });
      return;
    }

    try {
      const tx = await vault.ownerWithdraw(ethers.parseEther(amount));

      await tx.wait();

      setMessage({
        type: "success",
        text: `Withdrawn ${amount} ETH successfully`,
      });

      setAmount("");

      const newBalanceWei = await vault.balances(address);
      setUserBalance(ethers.formatEther(newBalanceWei));
    } catch (error) {
      console.error("Withdraw error:", error);

      setMessage({
        type: "error",
        text: "Withdraw failed (paused / insufficient / rejected)",
      });
    } finally {
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const setMaxAmount = () => {
    setAmount(userBalance);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💸 Withdraw Specfic ETH</h3>

      <div style={styles.balanceInfo}>
        <p style={styles.balanceLabel}>Available Balance:</p>
        <p style={styles.balanceAmount}>{userBalance} ETH</p>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Amount (ETH)</label>

        <div style={styles.inputWrapper}>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            style={styles.input}
          />

          <button onClick={setMaxAmount} style={styles.maxButton}>
            MAX
          </button>
        </div>
      </div>

      <button onClick={handleWithdrawSpecfic} style={styles.button}>
        Withdraw
      </button>

      {message.text && (
        <div
          style={{
            ...styles.messageBox,
            ...(message.type === "error" ? styles.errorBox : styles.successBox),
          }}
        >
          <p style={styles.messageText}>{message.text}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "18px",
  },
  balanceInfo: {
    backgroundColor: "#e3f2fd",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
  },
  balanceAmount: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1565c0",
    fontFamily: "monospace",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  inputWrapper: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  maxButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#FF9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  messageBox: {
    padding: "12px",
    borderRadius: "5px",
    marginTop: "15px",
  },
  messageText: {
    margin: 0,
    fontSize: "14px",
  },
  errorBox: {
    backgroundColor: "#ffebee",
    color: "#c62828",
  },
  successBox: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
};
