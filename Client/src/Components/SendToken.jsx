import React from 'react'
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
export default function SendToken() {
    const wallet = useWallet();
    const connection = useConnection();

    async function sendToken() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
    const Transaction = new Transaction();
     
    Transaction.add(SystemProgram.transfer({
        fromPubkey : wallet.publicKey,
        toPubkey : new PublicKey(to),
        lamports : amount * LAMPORTS_PER_SOL,
    }));
    await wallet.sendTransaction(Transaction,connection);
    alert("Sent" + amount + "SOL to " + to);
    } 
  return (
    <div>
        <input id='to' type='text' placeholder='Enter address to send'
         className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 mr-3 py-1 px-2 leading-tight focus:outline-none"
         />
        <input id='amount' type='number' placeholder='Enter amt (in SOL)'
         className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 mr-3 py-1 px-2 leading-tight focus:outline-none"
         />
        <button
         className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
         >Send</button>
    </div>
  )
}
