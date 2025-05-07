import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Dashboard = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) return;

      try {
        const connection = new Connection("https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559");
        
        // Fetch balance
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);

        // Fetch recent transactions
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
        const txDetails = await Promise.all(
          signatures.map(sig => connection.getTransaction(sig.signature))
        );
        setTransactions(txDetails);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="glass-card h-32"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-extrabold mb-8 neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        
        {/* Portfolio Summary */}
        <motion.div 
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-neon-blue">Portfolio Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="glass-card p-4 hover-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-gray-400 mb-2">SOL Balance</p>
              <p className="text-2xl font-bold text-neon-blue">{balance.toFixed(4)} SOL</p>
            </motion.div>
            <motion.div 
              className="glass-card p-4 hover-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-gray-400 mb-2">USD Value</p>
              <p className="text-2xl font-bold text-neon-purple">${(balance * 100).toFixed(2)}</p>
            </motion.div>
            <motion.div 
              className="glass-card p-4 hover-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-gray-400 mb-2">Transactions</p>
              <p className="text-2xl font-bold text-neon-pink">{transactions.length}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-neon-green">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-neon-blue">Signature</th>
                  <th className="text-left py-4 px-4 text-neon-purple">Status</th>
                  <th className="text-left py-4 px-4 text-neon-pink">Time</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {transactions.map((tx, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-white/10 hover:bg-glass/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <a 
                          href={`https://solscan.io/tx/${tx.transaction.signatures[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-blue hover:text-neon-purple transition-colors"
                        >
                          {tx.transaction.signatures[0].slice(0, 8)}...
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded-full text-sm">
                          Confirmed
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(tx.blockTime * 1000).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard; 