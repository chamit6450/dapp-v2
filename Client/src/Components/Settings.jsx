import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const Settings = () => {
  const { publicKey } = useWallet();
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    currency: 'USD',
    language: 'en',
    rpcEndpoint: 'https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('dapp_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('dapp_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          {/* Theme Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Theme</label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-gray-700">
                Enable notifications
              </label>
            </div>
          </div>

          {/* Currency Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Currency</h2>
            <div>
              <label className="block text-gray-700 mb-2">Default Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>

          {/* Language Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Language</h2>
            <div>
              <label className="block text-gray-700 mb-2">Interface Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          {/* RPC Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Network</h2>
            <div>
              <label className="block text-gray-700 mb-2">RPC Endpoint</label>
              <input
                type="text"
                name="rpcEndpoint"
                value={settings.rpcEndpoint}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter RPC endpoint"
              />
              <p className="mt-1 text-sm text-gray-500">
                Default: Solana Devnet
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 