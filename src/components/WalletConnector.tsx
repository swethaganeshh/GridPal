import React from 'react';
import { Button } from '../ui/Button';
import { Wallet, Link } from 'lucide-react';
import useAppStore from '../store';

const WalletConnector: React.FC = () => {
  const { 
    connectWallet, 
    disconnectWallet,
    isConnected, 
    isConnecting, 
    universalProfile,
    connectionError 
  } = useAppStore();

  // Handler for wallet connection
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  if (isConnected && universalProfile) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <div className="text-xs text-gray-400">Connected as:</div>
          <div className="text-sm font-medium truncate max-w-[120px]">
            {universalProfile.name || universalProfile.address.substring(0, 8) + '...'}
          </div>
        </div>
        <Button
          onClick={disconnectWallet}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 animate-fade-in"
      >
        {isConnecting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          <>
            <Wallet size={18} />
            <span>Connect Universal Profile</span>
          </>
        )}
      </Button>
      
      {connectionError && (
        <div className="mt-2 text-error-500 text-sm animate-slide-up">
          {connectionError}
        </div>
      )}
      
      <div className="mt-4 text-xs text-center text-gray-500 flex items-center gap-1">
        <Link size={12} />
        <span>First time? <a href="https://universalprofile.cloud" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 underline">Create a Universal Profile</a></span>
      </div>
    </div>
  );
};

export default WalletConnector;