import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
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
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/' element={<Signin/>}/>
        <Route path="/Airdrop" element={<Airdrop />} />
        <Route path="/SendToken" element={<SendToken />} />
      </Routes>
    </BrowserRouter>
    </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
    </div>
  )
}

export default App