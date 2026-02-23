import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import VaultABI from "./TokenVault.json";

const VAULT_ADDRESS = "0x3698388f631d4Fb2FE87C63d3D0c7e36b023d23A";

export function useVaultContract(write = false) {
  const { provider, signer } = useWallet();

  if (!provider) return null;

  return new ethers.Contract(
    VAULT_ADDRESS,
    VaultABI.abi,
    write ? signer : provider
  );
}
