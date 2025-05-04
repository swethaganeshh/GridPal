import React, { useState, useEffect } from 'react';

interface GridPalAvatarProps {
  isTyping?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const GridPalAvatar: React.FC<GridPalAvatarProps> = ({ 
  isTyping = false,
  size = 'md' 
}) => {
  const [glowing, setGlowing] = useState(false);
  
  // Determine size class
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];
  
  // Animation for random glowing effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Random glow effect when not typing
      if (!isTyping && Math.random() > 0.7) {
        setGlowing(true);
        setTimeout(() => setGlowing(false), 700);
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [isTyping]);

  // Always glow when typing
  useEffect(() => {
    if (isTyping) {
      setGlowing(true);
    } else {
      setGlowing(false);
    }
  }, [isTyping]);

  return (
    <div className={`relative ${sizeClass}`}>
      <div className={`absolute inset-0 rounded-full 
        ${glowing ? 'animate-pulse-slow' : ''} 
        bg-gradient-to-r from-primary-400 to-secondary-400 opacity-60 
        blur-md transform scale-110 transition-all duration-300`} 
      />
      
      <div className={`relative ${sizeClass} rounded-full overflow-hidden 
        bg-gradient-to-r from-primary-600 to-secondary-600 
        flex items-center justify-center text-white shadow-lg
        border-2 ${glowing ? 'border-white' : 'border-transparent'} 
        transition-all duration-300`}>
        
        {/* Grid logo design */}
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-5 h-5">
          {Array(9).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={`
                ${Math.random() > 0.5 || (isTyping && i % 2 === 0) ? 'bg-white' : 'bg-white/30'} 
                rounded-sm transition-all duration-300
                ${isTyping ? 'animate-pulse' : ''}
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
      
      {/* Typing indicator */}
      {isTyping && (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-1.5 py-0.5 
          shadow-md border border-primary-100 flex items-center gap-0.5">
          <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  );
};

export default GridPalAvatar;