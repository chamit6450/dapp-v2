import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen mt-6">
      <nav className="flex items-center justify-between bg-zinc-800 text-white py-3 px-8 rounded-full w-[80%] max-w-4xl mx-auto ">
      
        <div className="text-2xl font-bold">b</div>

        
        <div className="flex space-x-8">
          <a onClick={()=> navigate("/")} className="hover:text-gray-400">
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
        <button className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200">
          Launch App
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
