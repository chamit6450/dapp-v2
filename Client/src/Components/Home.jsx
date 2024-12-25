import React from 'react';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="animate-fadeIn text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-green-500 text-center mt-16">
        Welcome to Crypto World!
      </h1>

      <div className="animate-slidein flex mt-20">
        {/* Secure Transactions Card */}
        <div className="relative flex flex-col my-6 ml-14 bg-gray-900 shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="p-4">
            <h5 className="mb-2 text-gray-900 dark:text-white text-xl font-semibold">
              🔒 Secure Transactions
            </h5>
            <p className="text-gray-500 dark:text-gray-400 leading-normal font-light">
              Your data and transactions are protected with advanced encryption, ensuring safety at every step.
              Every operation is handled securely, preventing unauthorized access and offering peace of mind to users.
            </p>
          </div>
        </div>

        {/* Transparency Card */}
        <div className="relative flex flex-col my-6 ml-9 bg-gray-900 shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="p-4">
            <h5 className="mb-2 text-gray-900 dark:text-white text-xl font-semibold">
              🛠️ Transparency
            </h5>
            <p className="text-gray-500 dark:text-gray-400 leading-normal font-light">
            All actions are immutably recorded on the blockchain, offering complete visibility and trust. 
            Users can independently verify transactions, fostering a system that’s open and accountable for everyone.
            </p>
          </div>
        </div>

        {/* Decentralization Card */}
        <div className="relative flex flex-col my-6 ml-9 bg-gray-900 shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="p-4">
            <h5 className="mb-2 text-gray-900 dark:text-white text-xl font-semibold">
              🌐 Decentralization
            </h5>
            <p className="text-gray-500 dark:text-gray-400 leading-normal font-light">
              Empowering users with full control over their assets and decisions, free from central authority.
              Decisions are made collectively, ensuring no single entity holds excessive power over the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
