import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { WalletConnect } from './components/WalletConnect';
import { Faucet } from './components/Faucet';
import { TradingInterface } from './components/TradingInterface';
import { loginUser } from './api';
import { User } from './types';
import { Building2 } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async (account: string) => {
    try {
      setLoading(true);
      const userData = await loginUser(account);
      setUser(userData);
    } catch (error) {
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50">
      <Toaster position="top-right" />
      
      <nav className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">GlassTrade</h1>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-dark-200">
                  Balance: {user.balance} tokens
                </span>
                <span className="text-sm font-mono bg-dark-800 px-3 py-1 rounded">
                  {user.account.slice(0, 6)}...{user.account.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold mb-8">
              Welcome to GlassTrade
            </h2>
            <WalletConnect onConnect={handleConnect} />
          </div>
        ) : (
          <div className="space-y-8">
            {user.balance === 0 && (
              <Faucet user={user} onTokensReceived={setUser} />
            )}
            <TradingInterface 
              user={user} 
              onOrderPlaced={() => {
                loginUser(user.account).then(setUser);
              }} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;