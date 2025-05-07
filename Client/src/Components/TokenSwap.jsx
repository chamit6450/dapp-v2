import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const TokenSwap = () => {
  const { publicKey } = useWallet();
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState(0);
  const [loading, setLoading] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0.5);

  const tokens = [
    { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112' },
    { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { symbol: 'USDT', name: 'Tether', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  ];

  const handleSwap = async () => {
    if (!publicKey || !amount) return;
    setLoading(true);

    try {
      // Simulate swap delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEstimatedOutput(parseFloat(amount) * 0.95);
      setPriceImpact(0.5);
    } catch (error) {
      console.error('Error performing swap:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        <motion.div 
          className="glass-card p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-extrabold mb-6 neon-text text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Token Swap
          </motion.h1>
          
          {/* From Token */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-neon-blue mb-2">From</label>
            <div className="flex gap-2">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="neon-input flex-1 p-3"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="neon-input flex-1 p-3"
              />
            </div>
          </motion.div>

          {/* Swap Direction Indicator */}
          <motion.div 
            className="flex justify-center my-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button 
              className="p-3 rounded-full bg-glass backdrop-blur-glass border border-white/10
                       hover:border-neon-blue hover:shadow-neon transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </motion.div>

          {/* To Token */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="block text-neon-purple mb-2">To</label>
            <div className="flex gap-2">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="neon-input flex-1 p-3"
              >
                {tokens.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={estimatedOutput.toFixed(6)}
                readOnly
                className="neon-input flex-1 p-3 bg-glass/50"
              />
            </div>
          </motion.div>

          {/* Swap Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={handleSwap}
              disabled={!publicKey || !amount || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full neon-button ${(!publicKey || !amount || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                'Swap'
              )}
            </motion.button>
          </motion.div>

          {/* Price Impact Warning */}
          <AnimatePresence>
            {amount && (
              <motion.div 
                className="mt-6 glass-card p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Price Impact</span>
                  <span className="text-neon-pink">{priceImpact}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Minimum Received</span>
                  <span className="text-neon-green">
                    {(estimatedOutput * (1 - priceImpact/100)).toFixed(6)} {toToken}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TokenSwap; 