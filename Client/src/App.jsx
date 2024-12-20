import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import './global.css';
function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      {/* <Airdrop/> */}
      <SendToken/>
    </div>
  )
}

export default App