import React, { useRef, useEffect, useState } from 'react';
import { SendHorizontal, Trash2 } from 'lucide-react';
import { Message } from '../types';
import useAppStore from '../store';
import GridPalAvatar from './GridPalAvatar';
import { Button } from '../ui/Button';

const ChatBox: React.FC = () => {
  const { messages, isTyping, sendMessage, clearChat } = useAppStore();
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Submit message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Render message bubble
  const MessageBubble = ({ message }: { message: Message }) => {
    const isGridPal = message.sender === 'gridpal';
    
    return (
      <div className={`flex ${isGridPal ? 'justify-start' : 'justify-end'} mb-4 animate-slide-up`}>
        {isGridPal && (
          <div className="mr-2 mt-1">
            <GridPalAvatar size="sm" />
          </div>
        )}
        
        <div className={`max-w-[80%] md:max-w-[70%] flex flex-col ${isGridPal ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isGridPal 
              ? 'bg-white/10 backdrop-blur-sm text-white border border-white/10' 
              : 'bg-primary-600 text-white'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1 px-2">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        {!isGridPal && (
          <div className="ml-2 mt-1 bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">
            You
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <GridPalAvatar isTyping={isTyping} />
          <div>
            <h2 className="font-bold text-white">GridPal</h2>
            <p className="text-xs text-gray-400">Your LUKSO blockchain assistant</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={clearChat}
          className="text-gray-400 hover:text-error-400"
          title="Clear chat"
        >
          <Trash2 size={18} />
        </Button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in">
            <GridPalAvatar size="lg" />
            <h3 className="text-xl font-semibold mt-6 text-white">Welcome to GridPal!</h3>
            <p className="text-gray-400 mt-2 max-w-md">
              I'm your friendly guide to the LUKSO blockchain ecosystem.
              Ask me anything about Universal Profiles, LSPs, or The Grid!
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "What is a Universal Profile?",
                "Tell me about LSP standards",
                "Explain The Grid",
                "How do I mint an NFT on LUKSO?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg text-sm text-white text-left transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 animate-fade-in">
            <GridPalAvatar size="sm" isTyping={true} />
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/10">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Universal Profiles, LSPs, or The Grid..."
              className="w-full bg-transparent text-white resize-none focus:outline-none text-sm min-h-[40px] max-h-32"
              rows={1}
            />
          </div>
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-primary-600 hover:bg-primary-700 p-3 rounded-xl"
          >
            <SendHorizontal size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;