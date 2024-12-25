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
      
        <div className="text-2xl font-bold">d</div>

        
        <div className="flex space-x-8">
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

        {/* Launch App Button */}
        {/* <button className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200">
          Launch App
        </button> */}
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
