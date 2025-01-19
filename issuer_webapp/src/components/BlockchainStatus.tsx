import React from 'react';
import { useBlockchain } from '../context/BlockchainContext';

export function BlockchainStatus() {
  const { isConnected, walletAddress, connect } = useBlockchain();

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Blockchain Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Wallet Connection:</span>
          <div className="flex items-center">
            {isConnected ? (
              <>
                <span className="text-green-600 mr-2">Connected</span>
                <span className="text-sm text-gray-500">
                  ({walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)})
                </span>
              </>
            ) : (
              <button
                onClick={connect}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}