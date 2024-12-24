import React, { useState } from 'react';
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";
import Navbar from './Navbar';
function Airdrop() {
    const wallet = useWallet();
    const connection = useConnection();
    const [amt, setAmt] = useState();
  async function sendAirDrop(){
    if(wallet.publickey){
        const lamports = amt * 1e9;
       try{
        const airdropSignature = await connection(wallet.publickey, lamports);
       } catch(error){
         alert("Airdrop failed");
         console.log("Airdrop Failed",error);
       }
    } else{
        alert("Connect your wallet!");
    }
  }
  const handleChange = (e)=>{
    setAmt(Number(e.target.value));
  }
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center  border-teal-500 py-2 ">
        <input type='text' placeholder='Enter SOL'
         className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg h-9 w-8/12 mr-3 py-1 px-2 leading-tight focus:outline-none"
        onChange={handleChange}
        />
        <button onClick={sendAirDrop}
         className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >Send</button>
    </div>
    </>
  )
}

export default Airdrop