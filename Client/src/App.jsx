import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Airdrop from "./Components/Airdrop";
import SendToken from './Components/SendToken';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import './global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/' element={<Signin/>}/>
        <Route path="/Airdrop" element={<Airdrop />} />
        <Route path="/SendToken" element={<SendToken />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App