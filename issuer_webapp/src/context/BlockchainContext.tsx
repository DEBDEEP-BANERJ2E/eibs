import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { connectWallet } from '../utils/avalanche';

interface BlockchainContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connect = async () => {
    try {
      const connectedSigner = await connectWallet();
      const address = await connectedSigner.getAddress();
      
      setSigner(connectedSigner);
      setWalletAddress(address);
      setIsConnected(true);
      toast.success('Wallet connected successfully');
    } catch (error) {
      toast.error('Failed to connect wallet');
      console.error(error);
    }
  };

  const disconnect = () => {
    setSigner(null);
    setWalletAddress(null);
    setIsConnected(false);
    toast.info('Wallet disconnected');
  };

  return (
    <BlockchainContext.Provider
      value={{
        isConnected,
        walletAddress,
        connect,
        disconnect
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}