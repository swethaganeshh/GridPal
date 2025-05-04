export interface UniversalProfile {
  address: string;
  name?: string;
  avatar?: string;
  description?: string;
  links?: SocialLink[];
}

export interface SocialLink {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'gridpal';
  timestamp: number;
}

export interface AppState {
  // Connection state
  isConnected: boolean;
  universalProfile: UniversalProfile | null;
  isConnecting: boolean;
  connectionError: string | null;

  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;

  // Chat state
  messages: Message[];
  isTyping: boolean;
  
  // Actions
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}