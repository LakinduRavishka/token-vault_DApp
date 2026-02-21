import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import VaultABI from "./TokenVault.json";

const VAULT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function useVaultContract(write = false) {
  const { provider, signer } = useWallet();

  if (!provider) return null;

  return new ethers.Contract(
    VAULT_ADDRESS,
    VaultABI.abi,
    write ? signer : provider
  );
}
