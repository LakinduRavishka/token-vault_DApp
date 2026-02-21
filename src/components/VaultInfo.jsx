import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useVaultContract } from "../contracts/useVaultContract";
import { useWallet } from "../context/WalletContext";

export default function VaultInfo() {
  const { provider, address } = useWallet();
  const vault = useVaultContract();

  const [vaultOwner, setVaultOwner] = useState("");
  const [networkDetails, setNetworkDetails] = useState(null);
  const [totalVaultBalance, setTotalVaultBalance] = useState(0);
  const [userVaultBalance, setUserVaultBalance] = useState(0);

  useEffect(() => {
    if (!vault || !provider || !address) return;
    // Get owner details from contract
    async function loadOwner() {
      if (!vault) return;
      const owner = await vault.owner();
      console.log("Owner", owner);
      setVaultOwner(owner);
    }

    // get network details
    async function getNetworkDetails() {
      const network = await provider.getNetwork();
      console.log("Network is ::", network);
      setNetworkDetails({ name: network.name, id: network.chainId });
      // setNetworkDetails(`${network.name} (${network.chainId})`);

      const nn = network.name;
      console.log(
        "%cNetwork is : " + network.name + network.chainId,
        "background: #1e1e1e; color: #ff3700; padding: 8px; border-left: 4px solid #ff9d00;",
      );
      // Unknown network handle
      console.log(nn === "unknown" ? "connected to localhost" : networkDetails);
    }

    // get total vault balance
    async function getTotalBalance() {
      const balance = await provider.getBalance(vault.getAddress());
      setTotalVaultBalance(ethers.formatEther(balance));
      console.log("get total vault balance is", balance);
      console.log("l Address", vault.getAddress());
      console.log("Total vault balance", balance);
    }

    // getConnectedUserBalance
    async function getUserVaultBalance() {
      // if (!vault || !provider) return;
      const balanceWei = await vault.balances(address);
      console.log("balanceWei", balanceWei);
      const balanceEth = ethers.formatEther(balanceWei);
      console.log("balanceEth", balanceEth);

      setUserVaultBalance(balanceEth);
      console.log(
        "%cYour/user Vault Balance:" + balanceEth,
        "background: #1e1e1e; color: #00ffcc; padding: 8px; border-left: 4px solid #00ffcc;",
      );
    }

    loadOwner();
    getNetworkDetails();
    getTotalBalance();
    getUserVaultBalance();
  }, [vault]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Vault Information</h2>

      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <p style={styles.infoLabel}>Your Vault Balance</p>
          <p style={styles.infoValue}>{userVaultBalance} ETH</p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.infoLabel}>Total Vault Balance{}</p>
          <p style={styles.infoValue}>{totalVaultBalance} ETH</p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.infoLabel}>Contract Owner</p>
          <p style={styles.infoValueSmall}>
            {vaultOwner.slice(0, 6)}...{vaultOwner.slice(-4)}
          </p>
          <p style={styles.fullAddress}>{vaultOwner}</p>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.infoLabel}>Network</p>
          {/* <p>
            {networkDetails?.name === "unknown"
              ? "localhost"
              : networkDetails?.name}
            <br />
            <p>{networkDetails && `Chain ID: ${networkDetails.chainId}`}</p>
          </p> */}
          <p>
            {networkDetails?.name === "unknown"
              ? `localhost (${networkDetails?.id})`
              : `${networkDetails?.name} (${networkDetails?.id})`}
          </p>
        </div>
      </div>

      <button style={styles.refreshButton}>🔄 Refresh</button>
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
    marginBottom: "20px",
    fontSize: "20px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "15px",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #e0e0e0",
  },
  infoLabel: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    color: "#666",
    fontWeight: "bold",
  },
  infoValue: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2196F3",
    fontFamily: "monospace",
  },
  infoValueSmall: {
    margin: "0 0 5px 0",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  fullAddress: {
    margin: "5px 0 0 0",
    fontSize: "10px",
    color: "#999",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  refreshButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
