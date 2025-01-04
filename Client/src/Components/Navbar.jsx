import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token and navigate to the login page
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-zinc-800 text-white py-3 px-8 rounded-lg shadow-md">
      {/* Left Section: Navigation Links */}
      <div className="flex items-center space-x-8">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
          />
        </svg>
        <a
          onClick={() => navigate("/Home")}
          className="cursor-pointer hover:text-gray-400"
        >
          Home
        </a>
        <a
          onClick={() => navigate("/Airdrop")}
          className="cursor-pointer hover:text-gray-400"
        >
          Airdrop
        </a>
        <a
          onClick={() => navigate("/SendToken")}
          className="cursor-pointer hover:text-gray-400"
        >
          SendToken
        </a>
      </div>

      {/* Center Section: Wallet Connect/Disconnect Buttons */}
      <ConnectionProvider
        endpoint={
          "https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex items-center space-x-4">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      {/* Right Section: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
