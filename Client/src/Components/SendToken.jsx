import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer'; 

export default function SendToken() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function sendToken() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet!");
            return;
        }
        
        if (!to || !amount) {
            alert("Please provide a recipient address and amount.");
            return;
        }

        setIsLoading(true);
        const transaction = new Transaction();

        try {
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL,
            }));

            const signature = await wallet.sendTransaction(transaction, connection);
            alert(`Successfully sent ${amount} SOL to ${to}`);
            setTo('');
            setAmount('');
        } catch (error) {
            alert("Transaction failed. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-3xl mx-auto">
                <motion.div 
                    className="glass-card p-8"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.h1 
                        className="text-3xl md:text-4xl font-extrabold mb-6 neon-text text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Send SOL Tokens
                    </motion.h1>
                    
                    <motion.p 
                        className="text-gray-300 text-center mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Transfer SOL to any address on the Solana network. Simply enter the recipient's address and the amount of SOL you want to send.
                    </motion.p>

                    <div className="space-y-6">
                        <motion.div 
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label htmlFor="to" className="text-lg mb-2 text-neon-blue">Recipient Address</label>
                            <input
                                id="to"
                                type="text"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="Enter address to send"
                                className="neon-input p-3"
                            />
                        </motion.div>

                        <motion.div 
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <label htmlFor="amount" className="text-lg mb-2 text-neon-purple">Amount (SOL)</label>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount (in SOL)"
                                className="neon-input p-3"
                            />
                        </motion.div>

                        <motion.div 
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <motion.button
                                onClick={sendToken}
                                disabled={isLoading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    'Send'
                                )}
                            </motion.button>
                        </motion.div>

                        <motion.p 
                            className="text-sm text-gray-400 text-center mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            * Ensure your wallet is connected and you have sufficient balance before sending.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
