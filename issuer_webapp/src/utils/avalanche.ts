import { ethers } from 'ethers';
import { toast } from 'react-toastify';

export const AVALANCHE_FUJI_NETWORK = {
  name: 'Avalanche Fuji Testnet',
  chainId: '0xa869', // 43113 in hex
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  symbol: 'AVAX',
  explorer: 'https://testnet.snowtrace.io'
};

export const CERTIFICATE_CONTRACT_ABI = [
  "function issueCertificate(string memory hash, address recipient) public",
  "function revokeCertificate(string memory hash) public",
  "function verifyCertificate(string memory hash) public returns (bool)",
  "function getCertificateDetails(string memory hash) public view returns (address issuer, address recipient, uint256 timestamp, bool isRevoked)",
  "event CertificateIssued(string hash, address issuer, address recipient, uint256 timestamp)",
  "event CertificateRevoked(string hash, uint256 timestamp)",
  "event CertificateVerified(string hash, bool isValid, uint256 timestamp)"
];

export async function setupFujiNetwork() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: AVALANCHE_FUJI_NETWORK.chainId,
        chainName: AVALANCHE_FUJI_NETWORK.name,
        nativeCurrency: {
          name: 'Avalanche',
          symbol: AVALANCHE_FUJI_NETWORK.symbol,
          decimals: 18
        },
        rpcUrls: [AVALANCHE_FUJI_NETWORK.rpcUrl],
        blockExplorerUrls: [AVALANCHE_FUJI_NETWORK.explorer]
      }]
    });
  } catch (error) {
    console.error('Failed to setup Fuji network:', error);
    throw error;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await setupFujiNetwork();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork();
    
    if (network.chainId !== parseInt(AVALANCHE_FUJI_NETWORK.chainId, 16)) {
      throw new Error('Please switch to Avalanche Fuji Testnet');
    }

    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error('Wallet connection error:', error);
    throw error;
  }
}