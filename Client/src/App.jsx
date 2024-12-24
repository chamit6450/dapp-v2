import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      {/* <Navbar/>
      <Home/>
      <Airdrop/>
      <SendToken/> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/Signup' element={<Signup/>}/> */}
        {/* <Route path="/Home" element={<Home />} /> */}
        {/* <Route path="/EnvCheck" element={<EnvCheck />} /> */}
        <Route path="/Airdrop" element={<Airdrop />} />
        <Route path="/SendToken" element={<SendToken />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App