import React, { useState } from 'react';
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";

function Airdrop() {
    const wallet = useWallet();
    const {connection }= useConnection();
    const [amt, setAmt] = useState();

    async function sendAirDrop() {
        if (wallet.publicKey) {
            const lamports = amt * 1e9;
            try {
                const airdropSignature = await connection.requestAirdrop(wallet.publicKey, lamports);
                alert(`Airdrop of ${amt} SOL was successful!`);
            } catch (error) {
                alert("Airdrop failed");
                console.log("Airdrop Failed", error);
            }
        } else {
            alert("Connect your wallet!");
        }
    }

    const handleChange = (e) => {
        setAmt(Number(e.target.value));
    }

    return (
        <div className="animate-slidein  bg-gradient-to-b from-neutral-900 to-gray-900 text-white py-16">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold mb-4">
                    Airdrop on Solana Network
                </h1>
                <p className="font-mono text-lg mb-8">
                    Participate in the airdrop and receive free SOL tokens! Simply enter the amount of SOL you want to claim and click "Send" to initiate the process.
                </p>
                
                <div className="flex items-center justify-center border-teal-500 py-2">
                    <input 
                        type='number' 
                        placeholder='Enter SOL' 
                        className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        onChange={handleChange}
                    />
                    <button 
                        onClick={sendAirDrop}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-6 rounded"
                    >
                        Send
                    </button>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                    * Airdrop requests will be processed as soon as the network is available. Please ensure your wallet is connected.
                </p>
            </div>
        </div>
    );
}

export default Airdrop;
