import React from 'react';
import WalletConnector from './components/WalletConnector';
import ChatBox from './components/ChatBox';
import UPProfileCard from './components/UPProfileCard';
import GridPalAvatar from './components/GridPalAvatar';
import useAppStore from './store';

function App() {
  const { isConnected } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary-800/20 blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary-800/20 blur-[100px]" />
        <div className="absolute top-[30%] right-[-10%] w-[45%] h-[40%] rounded-full bg-accent-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <GridPalAvatar />
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                GridPal
              </h1>
              <p className="text-xs text-gray-400">Your LUKSO blockchain companion</p>
            </div>
          </div>
          
          <WalletConnector />
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col lg:flex-row gap-6">
          {isConnected ? (
            <>
              {/* Sidebar */}
              <div className="lg:w-1/3 xl:w-1/4">
                <UPProfileCard />
                
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-2">About GridPal</h3>
                  <p className="text-xs text-gray-300">
                    GridPal is your AI companion for exploring the LUKSO blockchain,
                    Universal Profiles, and The Grid. Ask anything about these topics
                    to get friendly, helpful explanations.
                  </p>
                </div>
              </div>
              
              {/* Chat Area */}
              <div className="flex-1 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden flex flex-col">
                <ChatBox />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-md p-8 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
                <div className="flex justify-center mb-6">
                  <GridPalAvatar size="lg" />
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                  Connect Your Universal Profile
                </h2>
                
                <p className="text-gray-300 text-center mb-8">
                  Please connect your Universal Profile to access GridPal and explore the LUKSO ecosystem.
                </p>
                
                <div className="flex justify-center">
                  <WalletConnector />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>©2025 GridPal - Your AI companion for LUKSO and The Grid</p>
        </footer>
      </div>
    </div>
  );
}

export default App;