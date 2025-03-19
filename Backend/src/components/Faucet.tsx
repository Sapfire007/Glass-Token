import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import { requestTokens } from '../api';
import { User } from '../types';

interface Props {
  user: User;
  onTokensReceived: (user: User) => void;
}

export const Faucet: React.FC<Props> = ({ user, onTokensReceived }) => {
  const [amount, setAmount] = useState(10000);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    try {
      setLoading(true);
      const updatedUser = await requestTokens(user.account, amount);
      onTokensReceived(updatedUser);
    } catch (error) {
      console.error('Failed to request tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Droplets className="w-6 h-6 text-blue-500" />
        Token Faucet
      </h2>
      <p className="mb-4 text-gray-600">
        Request initial tokens to start trading. You can request up to 10,000 tokens.
      </p>
      <div className="flex gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.min(10000, Math.max(0, parseInt(e.target.value))))}
          className="flex-1 border rounded-lg px-3 py-2"
          max={10000}
          min={0}
        />
        <button
          onClick={handleRequest}
          disabled={loading || amount <= 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Requesting...' : 'Request Tokens'}
        </button>
      </div>
    </div>
  );
};