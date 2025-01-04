import React, { useState } from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import './global.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('auth_token');  // Check if the user is authenticated

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    navigate('/');  // Redirect to login page if not authenticated
    return null;  // Render nothing if the user is redirected
  }

  return children;  // Render the child component (protected page)
}

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <Routes>
                {/* Protected Routes */}
                <Route path='/Home' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/Airdrop" element={<PrivateRoute><Airdrop /></PrivateRoute>} />
                <Route path="/SendToken" element={<PrivateRoute><SendToken /></PrivateRoute>} />

                {/* Public Routes */}
                <Route path='/Signup' element={<Signup />} />
                <Route path='/' element={<Signin />} />
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
