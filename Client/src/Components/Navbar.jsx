import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <nav className="flex items-center justify-between bg-zinc-800 text-white py-3 px-8 rounded-full w-[80%] max-w-4xl mx-auto ">
      

        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"/>
</svg>

        <div className="flex space-x-8 cursor-pointer">
          <a onClick={()=> navigate("/Home")} className="hover:text-gray-400">
            Home
          </a>
          <a onClick={()=> navigate("/Airdrop")} className="hover:text-gray-400">
            Airdrop
          </a>
          <a onClick={()=> navigate("/SendToken")} className="hover:text-gray-400">
            SendToken
          </a>
        </div>

       
        <ConnectionProvider endpoint={"https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex space-x-4">
            <div className="rounded-full">
            <WalletMultiButton />
            </div>
            <div>
            <WalletDisconnectButton />
             </div>                   
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
      </nav>
    </div>
  );
};

export default Navbar;
