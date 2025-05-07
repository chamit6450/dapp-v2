import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import Dashboard from './Components/Dashboard';
import TokenSwap from './Components/TokenSwap';
import NFTGallery from './Components/NFTGallery';
import Settings from './Components/Settings';
import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/Airdrop" element={<Airdrop />} />
                <Route path="/SendToken" element={<SendToken />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/TokenSwap" element={<TokenSwap />} />
                <Route path="/NFTGallery" element={<NFTGallery />} />
                <Route path="/Settings" element={<Settings />} />
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
