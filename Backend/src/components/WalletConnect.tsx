import React from 'react';
import { Wallet } from 'lucide-react';
import { ethers } from 'ethers';

interface Props {
  onConnect: (account: string) => void;
}

export const WalletConnect: React.FC<Props> = ({ onConnect }) => {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts[0]) {
        onConnect(accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Wallet className="w-5 h-5" />
      Connect Wallet
    </button>
  );
};