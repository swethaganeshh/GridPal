import { create } from 'zustand';
import { AppState, Message, UniversalProfile } from '../types';
import { connectWalletWithWeb3Modal, disconnectWeb3 } from '../utils/web3';
import { mockSendMessageToAI } from '../utils/mockAi';

// Generate a unique ID for messages
const generateId = (): string => Math.random().toString(36).substring(2, 15);

const useAppStore = create<AppState>((set, get) => ({
  // Connection state
  isConnected: false,
  universalProfile: null,
  isConnecting: false,
  connectionError: null,

  // Chat state
  messages: [],
  isTyping: false,

  // Actions
  connectWallet: async () => {
    try {
      set({ isConnecting: true, connectionError: null });
      const profile = await connectWalletWithWeb3Modal();
      set({ 
        isConnected: true, 
        universalProfile: profile,
        isConnecting: false 
      });
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      set({ connectionError: errorMessage, isConnecting: false });
      console.error('Wallet connection error:', error);
    }
  },

  disconnectWallet: () => {
    disconnectWeb3();
    set({ 
      isConnected: false, 
      universalProfile: null,
      messages: [] 
    });
  },

  sendMessage: async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: Date.now(),
    };

    set(state => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    try {
      // In a real app, this would call the OpenAI API
      const response = await mockSendMessageToAI(content);
      
      // Add AI response message
      const aiMessage: Message = {
        id: generateId(),
        content: response,
        sender: 'gridpal',
        timestamp: Date.now(),
      };

      set(state => ({
        messages: [...state.messages, aiMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error('Error sending message to AI:', error);
      set({ isTyping: false });
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        content: "I'm having trouble connecting right now. Please try again later.",
        sender: 'gridpal',
        timestamp: Date.now(),
      };
      
      set(state => ({
        messages: [...state.messages, errorMessage],
      }));
    }
  },

  clearChat: () => {
    set({ messages: [] });
  },
}));

export default useAppStore;