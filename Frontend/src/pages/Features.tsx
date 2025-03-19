import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Features = () => {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Spline Design as Background */}
      <iframe
        src="https://my.spline.design/cubic-f94165e72c8277e4e1b3594138cb82da/"
        className="absolute inset-0 w-full h-full pointer-events-none object-cover object-center"
        title="Spline Design"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          position: 'absolute',
          top: '0',
          left: '0'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-xl"
        >
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-gtoken-blue via-gtoken-purple to-gtoken-pink bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 5
            }}
          >
            Features
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-gtoken-blue/80 via-gtoken-purple/80 to-gtoken-pink/80 p-2 rounded-lg">
              Discover the powerful features of Glass Token
            </span>
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Backend & API</h2>
            <p className="text-white/70">Powered by Node.js & Express, providing robust server and API functionality.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Data Storage</h2>
            <p className="text-white/70">Secure data storage using MongoDB & Mongoose.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Crypto Wallet Integration</h2>
            <p className="text-white/70">Seamless MetaMask interactions and smart contract execution with Ethers.js.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Real-time Transactions</h2>
            <p className="text-white/70">Experience real-time transactions and cross-origin accessibility (CORS).</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Frontend Interaction</h2>
            <p className="text-white/70">Built with React and TypeScript for a smooth, decentralized trading experience.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-gtoken-purple/40"
          >
            <h2 className="text-xl font-bold text-white mb-2">Instant Notifications</h2>
            <p className="text-white/70">Receive instant notifications using React-hot-toast.</p>
          </motion.div>
        </div>
      </div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleGoBack}
        onKeyDown={(e) => e.key === 'Enter' && handleGoBack()}
        className="absolute top-4 left-4 cursor-pointer z-50"
        role="button"
        tabIndex={0}
        aria-label="Back to Home"
      >
        <div className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center px-4 py-2 rounded-full border border-white/20 shadow-md transition-all duration-300 hover:shadow-gtoken-purple/30">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Home
        </div>
      </motion.div>
    </div>
  );
};

export default Features; 