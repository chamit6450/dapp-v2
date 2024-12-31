import React from 'react';
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import Navbar from './Navbar';
import { Buffer } from 'buffer'; 

export default function SendToken() {
    const wallet = useWallet();
    const {connection}= useConnection();

    async function sendToken() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet!");
            return;
        }
        
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;

        if (!to || !amount) {
            alert("Please provide a recipient address and amount.");
            return;
        }

        const transaction = new Transaction();

        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        try {
            const signature = await wallet.sendTransaction(transaction, connection);
            alert(`Successfully sent ${amount} SOL to ${to}`);
        } catch (error) {
            alert("Transaction failed. Please try again.");
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="animate-slidein bg-gradient-to-b from-neutral-900 to-gray-900 text-white py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold mb-4">
                        Send SOL Tokens
                    </h1>
                    <p className="font-mono text-lg mb-8">
                        Transfer SOL to any address on the Solana network. Simply enter the recipient's address and the amount of SOL you want to send, then click "Send".
                    </p>

                    <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            <label htmlFor="to" className="text-lg mb-2 text-gray-300">Recipient Address</label>
                            <input
                                id="to"
                                type="text"
                                placeholder="Enter address to send"
                                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col items-center">
                            <label htmlFor="amount" className="text-lg mb-2 text-gray-300">Amount (SOL)</label>
                            <input
                                id="amount"
                                type="number"
                                placeholder="Enter amount (in SOL)"
                                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={sendToken}
                                className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-6 rounded"
                            >
                                Send
                            </button>
                        </div>

                        <p className="text-sm text-gray-300 mt-4">
                            * Ensure your wallet is connected and you have sufficient balance before sending.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
