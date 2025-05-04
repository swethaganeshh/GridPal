import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { UniversalProfile } from '../types';

// LUKSO Mainnet and Testnet RPCs
const LUKSO_RPC_MAINNET = 'https://rpc.lukso.network';
const LUKSO_RPC_TESTNET = 'https://rpc.testnet.lukso.network';

// Create Web3Modal instance
const web3Modal = new Web3Modal({
  network: 'mainnet', // This can be 'mainnet', 'testnet', etc.
  cacheProvider: true,
  providerOptions: {},
});

// Will hold references to provider and contract instances
let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;

/**
 * Connect wallet using Web3Modal
 */
export const connectWalletWithWeb3Modal = async (): Promise<UniversalProfile> => {
  try {
    // Clear any existing connection
    if (provider) {
      await disconnectWeb3();
    }

    // Connect Web3Modal
    const web3Provider = await web3Modal.connect();

    // Create ethers provider (for Ethers v5)
    provider = new ethers.providers.Web3Provider(web3Provider);
    signer = provider.getSigner();

    // Get connected address
    const address = await signer.getAddress();

    // Mock profile for development (would be fetched from LUKSO in real app)
    const profile: UniversalProfile = {
      address,
      name: 'Universal Profile',
      avatar: 'https://images.pexels.com/photos/7265990/pexels-photo-7265990.jpeg',
      description: 'My first Universal Profile on LUKSO',
      links: [
        { title: 'Twitter', url: 'https://twitter.com/lukso_io' },
        { title: 'Website', url: 'https://lukso.network' }
      ]
    };

    return profile;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw new Error('Failed to connect wallet. Please try again.');
  }
};

/**
 * Disconnect Web3 connection
 */
export const disconnectWeb3 = async (): Promise<void> => {
  if (web3Modal) {
    web3Modal.clearCachedProvider();
  }
  provider = null;
  signer = null;
};

/**
 * Check if the connected address is a Universal Profile
 * This is a simplified mock implementation
 */
export const isUniversalProfile = async (address: string): Promise<boolean> => {
  // Real implementation would use ERC725 / LSP0 checks
  return true;
};
