import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';

const NFTGallery = () => {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) return;

      try {
        const connection = new Connection("https://divine-capable-seed.solana-devnet.quiknode.pro/3f4d8f9a6adc7a6ed015835e102028040732f559");
        const metaplex = new Metaplex(connection);
        
        // Fetch NFTs owned by the wallet
        const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey }).run();
        setNfts(nfts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">NFT Gallery</h1>
        
        {nfts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No NFTs found in your wallet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.mint.address.toString()}
                className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={nft.uri}
                    alt={nft.name}
                    className="object-cover w-full h-64"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=NFT+Image';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{nft.name}</h3>
                  <p className="text-gray-600 text-sm">{nft.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedNFT.name}</h2>
                  <button
                    onClick={() => setSelectedNFT(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedNFT.uri}
                      alt={selectedNFT.name}
                      className="w-full rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=NFT+Image';
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700">Description</h3>
                      <p className="text-gray-600">{selectedNFT.description || 'No description available'}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700">Attributes</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {selectedNFT.attributes?.map((attr, index) => (
                          <div key={index} className="bg-gray-100 p-2 rounded">
                            <p className="text-sm font-medium">{attr.trait_type}</p>
                            <p className="text-sm text-gray-600">{attr.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Details</h3>
                      <p className="text-sm text-gray-600">
                        Mint Address: {selectedNFT.mint.address.toString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTGallery; 